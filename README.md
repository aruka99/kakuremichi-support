# かくれみち サポートサイト

GitHub Pages向けの静的サイトです。ビルド作業は不要です。

## 公開前の確認

1. `kakuremichi.support@gmail.com` で問い合わせを受信できることを確認する。
2. プライバシーポリシーの外部サービスと保存内容が本番実装と一致するか確認する。
3. GitHubの公開リポジトリへ `support-site` の中身を配置する。
4. `Settings > Pages > Deploy from a branch` で `main` と `/ (root)` を選ぶ。
5. 公開URLをApp Store ConnectのサポートURLとプライバシーポリシーURLへ登録する。

## ローカル確認

```sh
python3 -m http.server 8080 --directory support-site
```

`http://localhost:8080` を開きます。
