import puppeteer from 'puppeteer'

export const captureScreenshot = async (
  htmlContent: string,
  styleSheet: string
) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  const htmlWithTailwind = `
    <html>
      <head>
        <style>
          ${styleSheet}
        </style>
      </head>
      <body>
        ${htmlContent}
      </body>
    </html>
  `

  await page.setContent(htmlWithTailwind, { waitUntil: 'networkidle0' })

  const screenshotBuffer = await page.screenshot({ encoding: 'binary' })

  await browser.close()

  return screenshotBuffer
}
