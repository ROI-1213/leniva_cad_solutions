import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

function lenivaDevApiPlugin(): Plugin {
  return {
    name: 'leniva-dev-api-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || ''
        if (!url.startsWith('/api/')) {
          return next()
        }

        const pathname = url.split('?')[0]

        // Route to the appropriate serverless API handler
        let handlerModulePath = ''
        if (pathname === '/api/cms') handlerModulePath = './api/cms.js'
        else if (pathname === '/api/stats') handlerModulePath = './api/stats.js'
        else if (pathname === '/api/quotes') handlerModulePath = './api/quotes.js'
        else if (pathname === '/api/contacts') handlerModulePath = './api/contacts.js'
        else if (pathname === '/api/enquiries') handlerModulePath = './api/enquiries.js'

        if (handlerModulePath) {
          try {
            const chunks: Buffer[] = []
            req.on('data', chunk => chunks.push(Buffer.from(chunk)))
            req.on('end', async () => {
              try {
                const bodyStr = Buffer.concat(chunks).toString('utf-8')
                let parsedBody: any = {}
                if (bodyStr) {
                  try {
                    parsedBody = JSON.parse(bodyStr)
                  } catch {
                    parsedBody = bodyStr
                  }
                }
                ;(req as any).body = parsedBody

                // Attach Express-compatible res.status and res.json helpers if missing
                const enhancedRes = res as any
                if (!enhancedRes.status) {
                  enhancedRes.status = function (code: number) {
                    res.statusCode = code
                    return enhancedRes
                  }
                }
                if (!enhancedRes.json) {
                  enhancedRes.json = function (data: any) {
                    if (!res.headersSent) {
                      res.setHeader('Content-Type', 'application/json')
                    }
                    res.end(JSON.stringify(data))
                    return enhancedRes
                  }
                }

                const mod = await import(handlerModulePath)
                await mod.default(req, enhancedRes)
              } catch (err: any) {
                console.error(`[Dev API] Error in ${pathname}:`, err)
                if (!res.headersSent) {
                  res.statusCode = 500
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify({ error: err?.message || 'Internal Dev API Error' }))
                }
              }
            })
            return
          } catch (e: any) {
            if (!res.headersSent) {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: e?.message }))
            }
            return
          }
        }

        // For any unknown /api/* requests, return clean JSON without crashing
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ status: 'ok', fallback: true }))
      })
    },
  }
}

export default defineConfig({
  base: '/',
  plugins: [react(), lenivaDevApiPlugin()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'framer-motion': ['framer-motion'],
          'icons': ['lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 800,
  },
  server: {
    host: '0.0.0.0',
    port: Number(process.env.PORT) || 8175,
  },
  preview: {
    host: '0.0.0.0',
    port: Number(process.env.PORT) || 8175,
  },
})
