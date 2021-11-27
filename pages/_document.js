import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta
                        name="keywords"
                        content="URL shortner, URL sharing, URL group sharing"
                    />
                    <meta name="author" content="Chirag Goyal" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
