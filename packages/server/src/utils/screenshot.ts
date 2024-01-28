import puppeteer from 'puppeteer'

export const captureScreenshot = async (htmlContent: string) => {
  // Launch the browser
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  // Set the HTML content
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' })

  // Capture the screenshot
  const screenshotBuffer = await page.screenshot({ encoding: 'binary' })

  // Close the browser
  await browser.close()

  return screenshotBuffer
}
