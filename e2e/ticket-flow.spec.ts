import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.evaluate('localStorage.clear()')
})

test('buyer searches, purchases, registers passkey, and signs in again', async ({ page }) => {
  await page.reload()
  await expect(
    page.getByRole('heading', { name: '手売りの一枚を、まだ出会っていない観客へ。' }),
  ).toBeVisible()

  await page.getByPlaceholder('バンド名・会場・ジャンル').fill('Lumen')
  await page.getByRole('button', { name: '検索' }).click()
  await expect(page).toHaveURL(/\/search/)
  await expect(page.getByText('Lumen Harbor').first()).toBeVisible()

  await page.getByRole('link', { name: '詳細を見る' }).first().click()
  await expect(page.getByRole('heading', { name: 'Lumen Harbor "Night Buoy"' })).toBeVisible()
  await page.getByRole('link', { name: '購入手続きへ' }).click()

  await page.getByPlaceholder('you@example.com').fill('fan@example.com')
  await page.getByRole('button', { name: '確認コードを発行' }).click()
  await expect(page.getByText('確認コード:')).toBeVisible()
  await page.getByPlaceholder('428913').fill('428913')
  await page.getByRole('button', { name: '登録して支払いへ' }).click()

  await expect(page.getByRole('heading', { name: 'カード情報' })).toBeVisible()
  await page.getByRole('button', { name: '確認画面へ' }).click()
  await expect(page.getByRole('heading', { name: '購入内容の確認' })).toBeVisible()
  await page.getByRole('button', { name: '決済を完了する' }).click()

  await expect(page.getByRole('heading', { name: 'Lumen Harbor "Night Buoy"' })).toBeVisible()
  await expect(page.getByRole('dialog', { name: '次回からパスキーでログイン' })).toBeVisible()
  await page.getByRole('button', { name: 'パスキーを登録' }).click()
  await page.getByRole('link', { name: '受け取り確認へ' }).click()

  await expect(page.getByRole('heading', { name: '受け取り確認' })).toBeVisible()
  await expect(page.getByRole('link', { name: '探す' })).toHaveCount(0)
  await expect(page.getByText('Lumen Harbor')).toHaveCount(0)
  await expect(page.getByLabel('購入番号', { exact: true })).toBeVisible()
  await expect(page.getByLabel('ダミーQRコード')).toHaveCount(0)
  await page.getByLabel('購入番号を確認し、紙チケットを受け取り済みにする').check()
  await expect(page.getByLabel('購入番号を確認し、紙チケットを受け取り済みにする')).toBeChecked()
  await page.getByRole('button', { name: '完了して閉じる' }).click()

  await expect(page.getByRole('heading', { name: 'Lumen Harbor "Night Buoy"' })).toBeVisible()
  await expect(page.getByRole('button', { name: '受け取り済み' })).toBeDisabled()
  await expect(page.getByRole('link', { name: '受け取り確認へ' })).toHaveCount(0)
  await page.goto('/tickets/evt-lumen-loop/pickup')
  await expect(page).toHaveURL(/\/tickets\/evt-lumen-loop$/)
  await expect(page.getByRole('button', { name: '受け取り済み' })).toBeDisabled()

  await page.getByRole('link', { name: 'マイページ' }).click()
  await expect(page.getByRole('heading', { name: 'fan@example.com' })).toBeVisible()
  await expect(page.getByRole('heading', { name: '応援ポイント 1080 pt' })).toBeVisible()
  await page.getByRole('button', { name: 'ログアウト' }).click()

  await expect(page.getByPlaceholder('you@example.com')).toHaveCount(0)
  await expect(page.getByRole('dialog', { name: 'パスキーでログイン' })).toBeVisible()
  await page.getByRole('button', { name: '認証する' }).click()
  await expect(page.getByRole('heading', { name: 'fan@example.com' })).toBeVisible()
})

test('seller console stays inside managed routes', async ({ page }) => {
  await page.goto('/managed')

  await expect(page.getByRole('heading', { name: '販売状況' })).toBeVisible()
  await expect(page.getByRole('link', { name: '探す' })).toHaveCount(0)

  await page.getByRole('link', { name: '公演' }).click()
  await expect(page).toHaveURL(/\/managed\/events/)
  await expect(page.getByRole('heading', { name: '掲載チケット' })).toBeVisible()
})
