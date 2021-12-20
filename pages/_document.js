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
                        property="og:url"
                        content="https://linkit.vercel.app/"
                    />
                    <meta property="og:type" content="Website" />
                    <meta property="og:title" content="LinkIt" />
                    <meta
                        property="og:description"
                        content="URL group sharing and URL shortner at one spot"
                    />
                    <meta
                        property="og:image"
                        content="https://linkit.vercel.app/home/4.webp"
                    />
                    <meta
                        property="twitter:card"
                        content="summary_large_image"
                    />
                    <meta
                        property="twitter:url"
                        content="https://linkit.vercel.app/"
                    />
                    <meta property="twitter:title" content="LinkIt" />
                    <meta
                        property="twitter:description"
                        content="URL group sharing and URL shortner at one spot"
                    />
                    <meta
                        property="twitter:image"
                        content="https://linkit.vercel.app/home/4.webp"
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
