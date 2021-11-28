import Head from "next/head";
import Header from "../Components/Header";

const index = () => {
    return (
        <>
            <Head>
                <title>Home | LinkIt</title>
                <meta
                    name="description"
                    content="URL group sharing and URL shortner at one spot"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </Head>
            <Header />
            <div>Hello anonymous</div>
        </>
    );
};

export default index;
