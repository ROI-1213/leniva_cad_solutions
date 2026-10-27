import os
import re
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import parse_xml, OxmlElement
from docx.oxml.ns import nsdecls, qn

def set_cell_background(cell, fill_hex):
    shading_elm = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
    cell._tc.get_or_add_tcPr().append(shading_elm)

def set_cell_margins(cell, top=120, bottom=120, left=180, right=180):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = parse_xml(f'<w:tcMar {nsdecls("w")}><w:top w:w="{top}" w:type="dxa"/><w:bottom w:w="{bottom}" w:type="dxa"/><w:left w:w="{left}" w:type="dxa"/><w:right w:w="{right}" w:type="dxa"/></w:tcMar>')
    tcPr.append(tcMar)

def set_table_borders(table, color="CBD5E1", sz="4"):
    tblPr = table._tbl.tblPr
    borders = parse_xml(
        f'<w:tblBorders {nsdecls("w")}>'
        f'<w:top w:val="single" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'<w:bottom w:val="single" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'<w:left w:val="none"/>'
        f'<w:right w:val="none"/>'
        f'<w:insideH w:val="single" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'<w:insideV w:val="none"/>'
        f'</w:tblBorders>'
    )
    tblPr.append(borders)

def add_callout(doc, text, callout_type="NOTE"):
    tbl = doc.add_table(rows=1, cols=1)
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    cell = tbl.cell(0, 0)
    
    # Styling colors
    if callout_type == "IMPORTANT":
        border_color = "DC2626" # Red
        bg_color = "FEF2F2"
        prefix = "IMPORTANT NOTICE: "
        prefix_color = RGBColor(185, 28, 28)
    elif callout_type == "TIP":
        border_color = "059669" # Green
        bg_color = "F0FDF4"
        prefix = "PRO TIP: "
        prefix_color = RGBColor(4, 120, 87)
    else:
        border_color = "0284C7" # Blue
        bg_color = "F0F9FF"
        prefix = "NOTE: "
        prefix_color = RGBColor(2, 132, 199)
        
    set_cell_background(cell, bg_color)
    set_cell_margins(cell, top=140, bottom=140, left=200, right=200)
    
    tcPr = cell._tc.get_or_add_tcPr()
    borders = parse_xml(
        f'<w:tcBorders {nsdecls("w")}>'
        f'<w:left w:val="single" w:sz="24" w:space="0" w:color="{border_color}"/>'
        f'<w:top w:val="none"/>'
        f'<w:right w:val="none"/>'
        f'<w:bottom w:val="none"/>'
        f'</w:tcBorders>'
    )
    tcPr.append(borders)
    
    p = cell.paragraphs[0]
    p.paragraph_format.space_before = Pt(2)
    p.paragraph_format.space_after = Pt(2)
    p.paragraph_format.line_spacing = 1.15
    
    r_prefix = p.add_run(prefix)
    r_prefix.bold = True
    r_prefix.font.color.rgb = prefix_color
    r_prefix.font.size = Pt(10)
    r_prefix.font.name = "Segoe UI"
    
    # Clean text from callout tags
    clean_text = text.strip()
    r_body = p.add_run(clean_text)
    r_body.font.size = Pt(10)
    r_body.font.color.rgb = RGBColor(51, 65, 85)
    r_body.font.name = "Segoe UI"
    
    # Empty space after table
    p_after = doc.add_paragraph()
    p_after.paragraph_format.space_before = Pt(0)
    p_after.paragraph_format.space_after = Pt(4)

def format_inline_runs(paragraph, text, base_font_size=10.5, is_bold=False, base_color=RGBColor(30, 41, 59)):
    # Parse bold (**), italics (*), code (`), and links ([...](...))
    # Simple regex tokenizer
    tokens = re.split(r'(\*\*.*?\*\*|\*.*?\*|`.*?`|\[.*?\]\(.*?\))', text)
    for token in tokens:
        if not token:
            continue
        if token.startswith("**") and token.endswith("**") and len(token) >= 4:
            r = paragraph.add_run(token[2:-2])
            r.bold = True
            r.font.name = "Segoe UI"
            r.font.size = Pt(base_font_size)
            r.font.color.rgb = base_color
        elif token.startswith("*") and token.endswith("*") and len(token) >= 2:
            r = paragraph.add_run(token[1:-1])
            r.italic = True
            r.font.name = "Segoe UI"
            r.font.size = Pt(base_font_size)
            r.font.color.rgb = base_color
        elif token.startswith("`") and token.endswith("`") and len(token) >= 2:
            r = paragraph.add_run(token[1:-1])
            r.font.name = "Consolas"
            r.font.size = Pt(base_font_size - 1)
            r.font.color.rgb = RGBColor(194, 65, 12) # Dark Orange/Red
        elif token.startswith("[") and "](" in token and token.endswith(")"):
            m = re.match(r'\[(.*?)\]\((.*?)\)', token)
            if m:
                label, url = m.groups()
                r = paragraph.add_run(label)
                r.font.name = "Segoe UI"
                r.font.size = Pt(base_font_size)
                r.font.color.rgb = RGBColor(2, 132, 199)
                r.underline = True
            else:
                r = paragraph.add_run(token)
                r.font.name = "Segoe UI"
                r.font.size = Pt(base_font_size)
                r.font.color.rgb = base_color
        else:
            r = paragraph.add_run(token)
            r.bold = is_bold
            r.font.name = "Segoe UI"
            r.font.size = Pt(base_font_size)
            r.font.color.rgb = base_color

def create_admin_word_doc(md_file_path, output_docx_path):
    doc = docx.Document()
    
    # Page setup - Margins (1 inch)
    for section in doc.sections:
        section.top_margin = Inches(0.8)
        section.bottom_margin = Inches(0.8)
        section.left_margin = Inches(0.85)
        section.right_margin = Inches(0.85)
        
        # Header & Footer
        header = section.header
        hp = header.paragraphs[0]
        hp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        hr = hp.add_run("Leniva CAD Solutions — Administrator Guide & Operations Manual")
        hr.font.name = "Segoe UI"
        hr.font.size = Pt(8.5)
        hr.font.color.rgb = RGBColor(148, 163, 184)
        
        footer = section.footer
        fp = footer.paragraphs[0]
        fp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        fr = fp.add_run("CONFIDENTIAL • INTERNAL OPERATIONAL USE ONLY")
        fr.font.name = "Segoe UI"
        fr.font.size = Pt(8.5)
        fr.font.color.rgb = RGBColor(148, 163, 184)

    with open(md_file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    # Title Page / Header Block
    title_p = doc.add_paragraph()
    title_p.paragraph_format.space_before = Pt(12)
    title_p.paragraph_format.space_after = Pt(4)
    tr = title_p.add_run("LENIVA CAD SOLUTIONS")
    tr.bold = True
    tr.font.name = "Segoe UI"
    tr.font.size = Pt(12)
    tr.font.color.rgb = RGBColor(2, 132, 199)

    h1_p = doc.add_paragraph()
    h1_p.paragraph_format.space_before = Pt(0)
    h1_p.paragraph_format.space_after = Pt(8)
    h1_r = h1_p.add_run("Administrator Guide & Operations Manual")
    h1_r.bold = True
    h1_r.font.name = "Segoe UI"
    h1_r.font.size = Pt(24)
    h1_r.font.color.rgb = RGBColor(30, 58, 138) # Navy

    sub_p = doc.add_paragraph()
    sub_p.paragraph_format.space_before = Pt(0)
    sub_p.paragraph_format.space_after = Pt(16)
    sub_r = sub_p.add_run("Complete operational manual for catalog administration, visual page section toggles, leads & quotes tracking, hero sliders, CAD software licensing, and cloud backups.")
    sub_r.font.name = "Segoe UI"
    sub_r.font.size = Pt(11)
    sub_r.font.color.rgb = RGBColor(71, 85, 105)

    # Metadata badge strip table
    meta_tbl = doc.add_table(rows=1, cols=3)
    meta_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    meta_widths = [Inches(2.2), Inches(2.2), Inches(2.2)]
    meta_labels = [("Document Version", "2.0 (Production)"), ("Portal URL", "/admin"), ("Last Updated", "October 2026")]
    for i, (col_label, col_val) in enumerate(meta_labels):
        cell = meta_tbl.cell(0, i)
        cell.width = meta_widths[i]
        set_cell_background(cell, "F8FAFC")
        set_cell_margins(cell, top=100, bottom=100, left=150, right=150)
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r1 = p.add_run(f"{col_label}\n")
        r1.font.name = "Segoe UI"
        r1.font.size = Pt(8.5)
        r1.font.color.rgb = RGBColor(100, 116, 139)
        r2 = p.add_run(col_val)
        r2.bold = True
        r2.font.name = "Segoe UI"
        r2.font.size = Pt(10)
        r2.font.color.rgb = RGBColor(30, 41, 59)
    set_table_borders(meta_tbl, color="E2E8F0")

    doc.add_paragraph().paragraph_format.space_after = Pt(12)

    # Process Markdown lines
    in_code_block = False
    code_block_lines = []
    in_table = False
    table_lines = []
    in_callout = False
    callout_type = "NOTE"
    callout_lines = []

    i = 0
    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        # Handle callout blocks (> [!NOTE], > [!IMPORTANT], > [!TIP])
        if stripped.startswith("> [!"):
            in_callout = True
            if "IMPORTANT" in stripped:
                callout_type = "IMPORTANT"
            elif "TIP" in stripped:
                callout_type = "TIP"
            else:
                callout_type = "NOTE"
            callout_lines = []
            i += 1
            while i < len(lines) and lines[i].strip().startswith(">"):
                c_line = lines[i].strip()[1:].strip()
                if c_line:
                    callout_lines.append(c_line)
                i += 1
            add_callout(doc, " ".join(callout_lines), callout_type)
            in_callout = False
            continue

        # Handle Code blocks (```)
        if stripped.startswith("```"):
            if not in_code_block:
                in_code_block = True
                code_block_lines = []
            else:
                in_code_block = False
                # Render code block as styled callout box
                tbl = doc.add_table(rows=1, cols=1)
                tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
                cell = tbl.cell(0, 0)
                set_cell_background(cell, "F1F5F9")
                set_cell_margins(cell, top=120, bottom=120, left=180, right=180)
                set_table_borders(tbl, color="CBD5E1")
                cp = cell.paragraphs[0]
                cp.paragraph_format.space_before = Pt(2)
                cp.paragraph_format.space_after = Pt(2)
                cp.paragraph_format.line_spacing = 1.1
                code_text = "\n".join(code_block_lines)
                cr = cp.add_run(code_text)
                cr.font.name = "Consolas"
                cr.font.size = Pt(8.5)
                cr.font.color.rgb = RGBColor(30, 41, 59)
                
                sp_p = doc.add_paragraph()
                sp_p.paragraph_format.space_after = Pt(6)
            i += 1
            continue

        if in_code_block:
            code_block_lines.append(line.rstrip())
            i += 1
            continue

        # Handle Tables (| col1 | col2 |)
        if stripped.startswith("|") and stripped.endswith("|"):
            table_lines.append(stripped)
            i += 1
            # Check if next line is table as well
            if i < len(lines) and lines[i].strip().startswith("|") and lines[i].strip().endswith("|"):
                continue
            else:
                # Render table
                # Filter out separator row (e.g. |---|---|)
                rows_data = []
                for t_line in table_lines:
                    if re.match(r'^\|[\s\-:]+(\|[\s\-:]+)+\|$', t_line):
                        continue
                    cols = [c.strip() for c in t_line.split("|")[1:-1]]
                    rows_data.append(cols)

                if rows_data:
                    num_rows = len(rows_data)
                    num_cols = max(len(r) for r in rows_data)
                    tbl = doc.add_table(rows=num_rows, cols=num_cols)
                    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
                    set_table_borders(tbl, color="CBD5E1")
                    
                    for r_idx, r_data in enumerate(rows_data):
                        row = tbl.rows[r_idx]
                        is_header = (r_idx == 0)
                        for c_idx, cell_value in enumerate(r_data):
                            if c_idx < num_cols:
                                cell = row.cells[c_idx]
                                cell.vertical_alignment = WD_ALIGN_VERTICAL.CENTER
                                if is_header:
                                    set_cell_background(cell, "1E3A8A") # Navy
                                    set_cell_margins(cell, top=100, bottom=100, left=140, right=140)
                                    p = cell.paragraphs[0]
                                    p.paragraph_format.space_before = Pt(2)
                                    p.paragraph_format.space_after = Pt(2)
                                    r = p.add_run(cell_value)
                                    r.bold = True
                                    r.font.name = "Segoe UI"
                                    r.font.size = Pt(9.5)
                                    r.font.color.rgb = RGBColor(255, 255, 255)
                                else:
                                    bg = "F8FAFC" if (r_idx % 2 == 1) else "FFFFFF"
                                    set_cell_background(cell, bg)
                                    set_cell_margins(cell, top=90, bottom=90, left=140, right=140)
                                    p = cell.paragraphs[0]
                                    p.paragraph_format.space_before = Pt(2)
                                    p.paragraph_format.space_after = Pt(2)
                                    # Handle <br> inside cells
                                    cell_lines = cell_value.split("<br>")
                                    for line_idx, cl in enumerate(cell_lines):
                                        if line_idx > 0:
                                            p = cell.add_paragraph()
                                            p.paragraph_format.space_before = Pt(1)
                                            p.paragraph_format.space_after = Pt(1)
                                        format_inline_runs(p, cl.strip(), base_font_size=9.5)

                    p_tbl_after = doc.add_paragraph()
                    p_tbl_after.paragraph_format.space_after = Pt(6)

                table_lines = []
                continue

        # Skip main # Leniva CAD Solutions as we already created cover title
        if stripped.startswith("# Leniva CAD Solutions"):
            i += 1
            continue

        # Section Headings
        if stripped.startswith("## "):
            h2_text = stripped[3:].strip()
            p = doc.add_paragraph()
            p.paragraph_format.space_before = Pt(18)
            p.paragraph_format.space_after = Pt(6)
            p.paragraph_format.keep_with_next = True
            r = p.add_run(h2_text)
            r.bold = True
            r.font.name = "Segoe UI"
            r.font.size = Pt(15)
            r.font.color.rgb = RGBColor(30, 58, 138)
            i += 1
            continue

        if stripped.startswith("### "):
            h3_text = stripped[4:].strip()
            p = doc.add_paragraph()
            p.paragraph_format.space_before = Pt(12)
            p.paragraph_format.space_after = Pt(4)
            p.paragraph_format.keep_with_next = True
            r = p.add_run(h3_text)
            r.bold = True
            r.font.name = "Segoe UI"
            r.font.size = Pt(12.5)
            r.font.color.rgb = RGBColor(2, 132, 199)
            i += 1
            continue

        if stripped.startswith("#### "):
            h4_text = stripped[5:].strip()
            p = doc.add_paragraph()
            p.paragraph_format.space_before = Pt(8)
            p.paragraph_format.space_after = Pt(3)
            p.paragraph_format.keep_with_next = True
            r = p.add_run(h4_text)
            r.bold = True
            r.font.name = "Segoe UI"
            r.font.size = Pt(11)
            r.font.color.rgb = RGBColor(51, 65, 85)
            i += 1
            continue

        # Horizontal rule (---)
        if stripped == "---":
            i += 1
            continue

        # Bullet lists (- or *)
        if stripped.startswith("- ") or stripped.startswith("* "):
            item_text = stripped[2:].strip()
            p = doc.add_paragraph(style='List Bullet')
            p.paragraph_format.space_before = Pt(1)
            p.paragraph_format.space_after = Pt(2)
            p.paragraph_format.line_spacing = 1.15
            format_inline_runs(p, item_text, base_font_size=10.5)
            i += 1
            continue

        # Numbered lists (1. , 2. )
        num_match = re.match(r'^(\d+)\.\s+(.*)$', stripped)
        if num_match:
            num_str, item_text = num_match.groups()
            p = doc.add_paragraph(style='List Number')
            p.paragraph_format.space_before = Pt(1)
            p.paragraph_format.space_after = Pt(2)
            p.paragraph_format.line_spacing = 1.15
            format_inline_runs(p, item_text, base_font_size=10.5)
            i += 1
            continue

        # Normal Paragraph
        if stripped:
            p = doc.add_paragraph()
            p.paragraph_format.space_before = Pt(2)
            p.paragraph_format.space_after = Pt(6)
            p.paragraph_format.line_spacing = 1.15
            format_inline_runs(p, stripped, base_font_size=10.5)
        
        i += 1

    doc.save(output_docx_path)
    print(f"Successfully generated Word document at: {output_docx_path}")

if __name__ == "__main__":
    md_path = os.path.abspath("docs/ADMIN_GUIDE_MANUAL.md")
    docx_path = os.path.abspath("docs/Leniva_CAD_Solutions_Admin_Guide_Manual.docx")
    create_admin_word_doc(md_path, docx_path)
