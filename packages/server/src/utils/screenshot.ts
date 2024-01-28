import puppeteer from 'puppeteer'

interface Args {
  styleSheet: string
  width: number
  height: number
}

export const captureScreenshot = async (
  htmlContent: string,
  { styleSheet, width, height }: Args
) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setViewport({ width, height, deviceScaleFactor: 2 })

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
