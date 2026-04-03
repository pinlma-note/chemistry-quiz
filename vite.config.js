import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pagesで公開するための設定
  // 実際のリポジトリ名がわからないため仮置きしています。「YOUR_REPO_NAME」を書き換えてください。
  base: '/YOUR_REPO_NAME/',
})
