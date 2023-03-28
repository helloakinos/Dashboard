import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro&family=Readex+Pro&display=swap" rel="stylesheet"/>
          <link href='https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css' rel='stylesheet'></link>
          <link href='https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css'></link>
        </Head>
        <body>
          <Main />
          <NextScript />
          <script src="https://kit.fontawesome.com/9f7c0fcabf.js" crossOrigin="anonymous"></script>
        </body>
      </Html>
    )
  }
}

export default MyDocument