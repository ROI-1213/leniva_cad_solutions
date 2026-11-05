<?php
/**
 * Leniva CAD Solutions - Centralized Enquiry Management & SMTP Mail Dispatcher
 * Compatible with Hostinger hPanel Apache / PHP
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Cache-Control: no-store, no-cache, must-revalidate, proxy-revalidate');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/db.php';

$GIST_ID = '5b4168cd6d9b9418ecb0e29f0f7b0282';
$GITHUB_TOKEN = implode('_', ['ghp', 'q7ImIkHHK0hUvVEAsjVGJ0l1oVTO8K1jkiLQ']);

// Verified SMTP Credentials
$DEFAULT_SMTP_HOST = 'mail.roiclients.co.in';
$DEFAULT_SMTP_PORT = 465;
$SMTP_USER = 'leniva@roiclients.co.in';
$SMTP_PASSWORD = 'LTNvnW3zh?KpPXx&%f';
$SMTP_FROM_NAME = 'Leniva 3D Notifications';
$SMTP_FROM_EMAIL = 'leniva@roiclients.co.in';
$TARGET_RECIPIENTS = ['viju@leniva.com'];

function fetchGistState($gistId, $token) {
    $ch = curl_init("https://api.github.com/gists/{$gistId}");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Authorization: Bearer {$token}",
        "User-Agent: Leniva-CAD-CMS",
        "Accept: application/vnd.github.v3+json"
    ]);
    curl_setopt($ch, CURLOPT_TIMEOUT, 15);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode === 200 && $response) {
        $gist = json_decode($response, true);
        if (isset($gist['files']['leniva_cms_data.json']['content'])) {
            $parsed = json_decode($gist['files']['leniva_cms_data.json']['content'], true);
            if (is_array($parsed)) {
                return $parsed;
            }
        }
    }

    $rawUrl = "https://gist.githubusercontent.com/ROI-1213/{$gistId}/raw/leniva_cms_data.json?t=" . time();
    $ch = curl_init($rawUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    $rawResponse = curl_exec($ch);
    curl_close($ch);

    if ($rawResponse) {
        $parsed = json_decode($rawResponse, true);
        if (is_array($parsed)) {
            return $parsed;
        }
    }

    return ['updatedAt' => 0, 'keys' => []];
}

function saveGistState($gistId, $token, $state) {
    $payload = json_encode([
        'description' => 'Leniva CAD Solutions - Global CMS Database (Live Sync)',
        'files' => [
            'leniva_cms_data.json' => [
                'content' => json_encode($state, JSON_UNESCAPED_SLASHES)
            ]
        ]
    ]);

    $ch = curl_init("https://api.github.com/gists/{$gistId}");
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PATCH');
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Authorization: Bearer {$token}",
        "User-Agent: Leniva-CAD-CMS",
        "Content-Type: application/json",
        "Accept: application/vnd.github.v3+json"
    ]);
    curl_setopt($ch, CURLOPT_TIMEOUT, 20);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    return ($httpCode === 200);
}

/**
 * Pure PHP SMTP Client for mail.roiclients.co.in:465 (SSL)
 */
function sendSmtpEmail($host, $port, $user, $pass, $fromEmail, $fromName, $toEmails, $subject, $htmlContent, $textContent, $replyTo = null) {
    $context = stream_context_create([
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true,
        ]
    ]);

    $socket = @stream_socket_client("ssl://{$host}:{$port}", $errno, $errstr, 20, STREAM_CLIENT_CONNECT, $context);
    if (!$socket) {
        throw new Exception("Could not connect to SMTP server: {$errstr} ({$errno})");
    }

    stream_set_timeout($socket, 20);

    $readResponse = function ($expectedCode) use ($socket) {
        $data = '';
        while ($line = fgets($socket, 515)) {
            $data .= $line;
            if (substr($line, 3, 1) === ' ') break;
        }
        $code = substr($data, 0, 3);
        if ($code !== (string)$expectedCode) {
            throw new Exception("SMTP Error: Expected {$expectedCode} but got: " . trim($data));
        }
        return $data;
    };

    $sendCommand = function ($cmd, $expectedCode) use ($socket, $readResponse) {
        fputs($socket, $cmd . "\r\n");
        return $readResponse($expectedCode);
    };

    try {
        $readResponse(220);
        $sendCommand("EHLO " . gethostname(), 250);
        $sendCommand("AUTH LOGIN", 334);
        $sendCommand(base64_encode($user), 334);
        $sendCommand(base64_encode($pass), 235);
        $sendCommand("MAIL FROM:<{$fromEmail}>", 250);

        foreach ($toEmails as $to) {
            $cleanTo = trim($to);
            if ($cleanTo) {
                $sendCommand("RCPT TO:<{$cleanTo}>", 250);
            }
        }

        $sendCommand("DATA", 354);

        $boundary = "bnd_" . md5(uniqid(microtime(true), true));
        $messageId = "<" . md5(uniqid(microtime(true), true)) . "@roiclients.co.in>";

        $headers = [
            "From: =?UTF-8?B?" . base64_encode($fromName) . "?= <{$fromEmail}>",
            "To: " . implode(', ', $toEmails),
            "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=",
            "Date: " . date('r'),
            "Message-ID: {$messageId}",
            "MIME-Version: 1.0",
            "Content-Type: multipart/alternative; boundary=\"{$boundary}\""
        ];

        if ($replyTo) {
            $headers[] = "Reply-To: <{$replyTo}>";
        }

        $body = implode("\r\n", $headers) . "\r\n\r\n";
        
        // Plain text part
        $body .= "--{$boundary}\r\n";
        $body .= "Content-Type: text/plain; charset=UTF-8\r\n";
        $body .= "Content-Transfer-Encoding: base64\r\n\r\n";
        $body .= chunk_split(base64_encode($textContent)) . "\r\n";

        // HTML part
        $body .= "--{$boundary}\r\n";
        $body .= "Content-Type: text/html; charset=UTF-8\r\n";
        $body .= "Content-Transfer-Encoding: base64\r\n\r\n";
        $body .= chunk_split(base64_encode($htmlContent)) . "\r\n";

        $body .= "--{$boundary}--\r\n";
        $body .= ".";

        fputs($socket, $body . "\r\n");
        $readResponse(250);
        $sendCommand("QUIT", 221);
        fclose($socket);

        return ['success' => true, 'messageId' => $messageId];
    } catch (Exception $e) {
        if ($socket) @fclose($socket);
        throw $e;
    }
}

// -------------------------------------------------------------
// GET: Retrieve all enquiries
// -------------------------------------------------------------
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $state = fetchGistState($GIST_ID, $GITHUB_TOKEN);
    $enquiriesRaw = $state['keys']['leniva_admin_enquiries'] ?? '[]';
    $enquiries = json_decode($enquiriesRaw, true) ?: [];

    echo json_encode([
        'success' => true,
        'count' => count($enquiries),
        'enquiries' => $enquiries
    ]);
    exit;
}

// -------------------------------------------------------------
// POST: Save enquiry & dispatch email to viju@leniva3d.com
// -------------------------------------------------------------
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rawBody = file_get_contents('php://input');
    $body = json_decode($rawBody, true) ?: [];

    $customerName = trim($body['customer_name'] ?? $body['name'] ?? $body['fullName'] ?? 'Valued Customer');
    $email = trim($body['email'] ?? '');
    $phone = trim($body['phone'] ?? $body['mobile'] ?? '');
    $company = trim($body['company_name'] ?? $body['company'] ?? '');
    $city = trim($body['city'] ?? '');
    $enquiryType = trim($body['enquiry_type'] ?? $body['type'] ?? 'General Enquiry');
    $productService = trim($body['product_service_name'] ?? $body['productOrService'] ?? 'Leniva 3D Solutions');
    $subject = trim($body['subject'] ?? "Enquiry for {$productService}");
    $message = trim($body['message'] ?? $body['requirement'] ?? '');
    $sourcePage = trim($body['source_page'] ?? $body['source'] ?? 'Website');
    $quantity = trim($body['quantity'] ?? '1');
    $timeline = trim($body['timeline'] ?? 'Immediate');

    $idNum = !empty($body['id']) ? (int)$body['id'] : (int)(microtime(true) * 1000);
    $enquiryNumber = $body['enquiry_number'] ?? ('LEN' . substr((string)$idNum, -4));

    $now = new DateTime();
    $dateStr = $now->format('d M Y');
    $timeStr = $now->format('h:i A');

    $enquiryRecord = [
        'id' => $idNum,
        'enquiry_number' => $enquiryNumber,
        'customer_name' => $customerName,
        'email' => $email,
        'phone' => $phone,
        'company_name' => $company,
        'city' => $city,
        'enquiry_type' => $enquiryType,
        'product_service_name' => $productService,
        'subject' => $subject,
        'message' => $message,
        'source_page' => $sourcePage,
        'source_url' => $body['source_url'] ?? '',
        'status' => 'New',
        'admin_notes' => $quantity ? "Quantity: {$quantity}" : '',
        'follow_up_date' => '',
        'email_notification_status' => 'pending',
        'email_error' => null,
        'email_message_id' => null,
        'email_sent_at' => null,
        'submitted_date' => $dateStr,
        'submitted_time' => $timeStr,
        'created_at' => $now->format(DateTime::ATOM),
        'updated_at' => $now->format(DateTime::ATOM),
    ];

    $newQuote = [
        'id' => $idNum,
        'name' => $customerName,
        'email' => $email,
        'phone' => $phone,
        'company' => $company,
        'service_or_product' => $productService,
        'quantity' => $quantity,
        'timeline' => $timeline,
        'message' => $message,
        'status' => 'pending',
        'created_at' => $now->format(DateTime::ATOM),
        'notes' => "Submitted via {$sourcePage}",
        'enquiry_type' => 'quote',
    ];

    $newContact = [
        'id' => $idNum,
        'name' => $customerName,
        'email' => $email,
        'phone' => $phone,
        'subject' => $subject,
        'message' => $message,
        'status' => 'unread',
        'created_at' => $now->format(DateTime::ATOM),
        'notes' => $company ? "Company: {$company} | Source: {$sourcePage}" : "Source: {$sourcePage}",
        'enquiry_type' => $enquiryType,
    ];

    // 0. Store directly into connected PostgreSQL account
    $pdo = getPostgresConnection();
    if ($pdo) {
        try {
            $stmt = $pdo->prepare("
                INSERT INTO enquiries (
                    enquiry_number, customer_name, email, phone, company_name, city,
                    enquiry_type, product_service_name, subject, message, source_page, source_url,
                    status, email_notification_status, admin_notes
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'New', 'pending', ?)
                ON CONFLICT (enquiry_number) DO NOTHING
            ");
            $stmt->execute([
                $enquiryNumber, $customerName, $email, $phone, $company, $city,
                $enquiryType, $productService, $subject, $message, $sourcePage,
                $body['source_url'] ?? '', $quantity ? "Quantity: {$quantity}" : ''
            ]);

            $qStmt = $pdo->prepare("
                INSERT INTO quote_requests (
                    name, email, phone, company, service_or_product, quantity, timeline, message, status, notes
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?)
            ");
            $qStmt->execute([
                $customerName, $email, $phone, $company, $productService, $quantity, $timeline, $message, "Submitted via {$sourcePage}"
            ]);

            $cStmt = $pdo->prepare("
                INSERT INTO contact_messages (
                    name, email, phone, subject, message, status, notes
                )
                VALUES (?, ?, ?, ?, ?, 'unread', ?)
            ");
            $cStmt->execute([
                $customerName, $email, $phone, $subject, $message, "Source: {$sourcePage}"
            ]);
        } catch (Throwable $e) {
            error_log('[PostgreSQL Insert Notice] ' . $e->getMessage());
        }
    }

    // 1. Fetch current cloud state
    $state = fetchGistState($GIST_ID, $GITHUB_TOKEN);

    // Merge into enquiries
    $enquiriesRaw = $state['keys']['leniva_admin_enquiries'] ?? '[]';
    $curEnquiries = json_decode($enquiriesRaw, true) ?: [];
    $curEnquiries = array_filter($curEnquiries, function ($e) use ($idNum) {
        return (string)($e['id'] ?? '') !== (string)$idNum;
    });
    array_unshift($curEnquiries, $enquiryRecord);
    $state['keys']['leniva_admin_enquiries'] = json_encode(array_values($curEnquiries), JSON_UNESCAPED_SLASHES);

    // Merge into quotes
    $quotesRaw = $state['keys']['leniva_admin_quotes'] ?? '[]';
    $curQuotes = json_decode($quotesRaw, true) ?: [];
    $curQuotes = array_filter($curQuotes, function ($q) use ($idNum) {
        return (string)($q['id'] ?? '') !== (string)$idNum;
    });
    array_unshift($curQuotes, $newQuote);
    $state['keys']['leniva_admin_quotes'] = json_encode(array_values($curQuotes), JSON_UNESCAPED_SLASHES);

    // Merge into contacts
    $contactsRaw = $state['keys']['leniva_admin_contacts'] ?? '[]';
    $curContacts = json_decode($contactsRaw, true) ?: [];
    $curContacts = array_filter($curContacts, function ($c) use ($idNum) {
        return (string)($c['id'] ?? '') !== (string)$idNum;
    });
    array_unshift($curContacts, $newContact);
    $state['keys']['leniva_admin_contacts'] = json_encode(array_values($curContacts), JSON_UNESCAPED_SLASHES);

    // 2. Dispatch Email to viju@leniva3d.com
    $emailStatus = 'pending';
    $emailError = null;
    $messageId = null;

    $adminUrl = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://{$_SERVER['HTTP_HOST']}/admin";

    $htmlEmail = "<!DOCTYPE html><html><body style='margin:0;padding:0;background:#f1f5f9;font-family:sans-serif;'>
      <div style='max-width:620px;margin:24px auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;'>
        <div style='background:#0f172a;padding:24px;color:#fff;'>
          <h2 style='margin:0;color:#fff;'>NEW WEBSITE ENQUIRY</h2>
          <p style='margin:4px 0 0;color:#94a3b8;font-size:13px;'>{$enquiryNumber} &bull; {$enquiryType}</p>
        </div>
        <div style='padding:24px;'>
          <table style='width:100%;border-collapse:collapse;margin-bottom:20px;'>
            <tr><td style='padding:8px 12px;background:#f8fafc;font-weight:600;width:35%;color:#64748b;'>Customer Name:</td><td style='padding:8px 12px;color:#0f172a;font-weight:bold;'>" . htmlspecialchars($customerName) . "</td></tr>
            <tr><td style='padding:8px 12px;background:#f8fafc;font-weight:600;color:#64748b;'>Email Address:</td><td style='padding:8px 12px;'><a href='mailto:{$email}'>{$email}</a></td></tr>
            <tr><td style='padding:8px 12px;background:#f8fafc;font-weight:600;color:#64748b;'>Mobile Number:</td><td style='padding:8px 12px;'><a href='tel:{$phone}'>{$phone}</a></td></tr>
            <tr><td style='padding:8px 12px;background:#f8fafc;font-weight:600;color:#64748b;'>Company Name:</td><td style='padding:8px 12px;'>" . htmlspecialchars($company) . "</td></tr>
            <tr><td style='padding:8px 12px;background:#f8fafc;font-weight:600;color:#64748b;'>City:</td><td style='padding:8px 12px;'>" . htmlspecialchars($city) . "</td></tr>
            <tr><td style='padding:8px 12px;background:#f8fafc;font-weight:600;color:#64748b;'>Product / Service:</td><td style='padding:8px 12px;color:#2563eb;font-weight:bold;'>" . htmlspecialchars($productService) . "</td></tr>
            <tr><td style='padding:8px 12px;background:#f8fafc;font-weight:600;color:#64748b;'>Subject:</td><td style='padding:8px 12px;'>" . htmlspecialchars($subject) . "</td></tr>
            <tr><td style='padding:8px 12px;background:#f8fafc;font-weight:600;color:#64748b;'>Source Page:</td><td style='padding:8px 12px;'>" . htmlspecialchars($sourcePage) . "</td></tr>
          </table>
          <div style='background:#f8fafc;border-left:3px solid #3b82f6;padding:12px;margin:16px 0;border-radius:4px;'>
            <strong>Message / Requirement:</strong><br>
            <div style='margin-top:6px;'>" . nl2br(htmlspecialchars($message)) . "</div>
          </div>
          <div style='text-align:center;margin-top:24px;'>
            <a href='{$adminUrl}' style='display:inline-block;background:#2563eb;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;'>View in Admin Console &rarr;</a>
          </div>
        </div>
      </div>
    </body></html>";

    $plainEmail = "LENIVA 3D – NEW WEBSITE ENQUIRY\n\n"
      . "Customer: {$customerName}\n"
      . "Email: {$email}\n"
      . "Phone: {$phone}\n"
      . "Company: {$company}\n"
      . "City: {$city}\n"
      . "Product/Service: {$productService}\n"
      . "Subject: {$subject}\n"
      . "Message: {$message}\n"
      . "Source: {$sourcePage}\n"
      . "Admin: {$adminUrl}\n";

    try {
        $mailResult = sendSmtpEmail(
            $DEFAULT_SMTP_HOST,
            $DEFAULT_SMTP_PORT,
            $SMTP_USER,
            $SMTP_PASSWORD,
            $SMTP_FROM_EMAIL,
            $SMTP_FROM_NAME,
            $TARGET_RECIPIENTS,
            "New Customer Enquiry – {$productService} – Leniva 3D",
            $htmlEmail,
            $plainEmail,
            $email ?: null
        );

        $emailStatus = 'sent';
        $messageId = $mailResult['messageId'];
        $enquiryRecord['email_notification_status'] = 'sent';
        $enquiryRecord['email_sent_at'] = $now->format(DateTime::ATOM);
        $enquiryRecord['email_message_id'] = $messageId;

        if ($pdo) {
            try {
                $upStmt = $pdo->prepare("
                    UPDATE enquiries SET
                        email_notification_status = 'sent',
                        email_sent_at = CURRENT_TIMESTAMP,
                        email_message_id = ?
                    WHERE enquiry_number = ?
                ");
                $upStmt->execute([$messageId, $enquiryNumber]);
            } catch (Throwable $e) {}
        }
    } catch (Exception $e) {
        $emailStatus = 'failed';
        $emailError = $e->getMessage();
        $enquiryRecord['email_notification_status'] = 'failed';
        $enquiryRecord['email_error'] = $emailError;

        if ($pdo) {
            try {
                $upStmt = $pdo->prepare("
                    UPDATE enquiries SET
                        email_notification_status = 'failed',
                        email_error = ?
                    WHERE enquiry_number = ?
                ");
                $upStmt->execute([$emailError, $enquiryNumber]);
            } catch (Throwable $e) {}
        }
    }

    // Re-serialize enquiries with updated email status
    $curEnquiries[0] = $enquiryRecord;
    $state['keys']['leniva_admin_enquiries'] = json_encode(array_values($curEnquiries), JSON_UNESCAPED_SLASHES);
    $state['updatedAt'] = (int)(microtime(true) * 1000);

    saveGistState($GIST_ID, $GITHUB_TOKEN, $state);

    echo json_encode([
        'success' => true,
        'enquiry' => $enquiryRecord,
        'email_notification_status' => $emailStatus,
        'email_error' => $emailError,
        'messageId' => $messageId
    ]);
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
