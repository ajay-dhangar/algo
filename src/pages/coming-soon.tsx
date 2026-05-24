import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";

export default function ComingSoon() {
    return (
        <Layout title="Coming Soon" description ="This Page is Coming Soon!">
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <h1 className="text-4xl font-bold mb-4">Coming Soon!</h1>
                <p className="text-gray-500 text-lg mb-8">
                    We are working on this page currently. Come back Soon!
                </p>
                <Link
                to="/docs"
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300"
                >
                    Back to Docs
                </Link>
            </div>
        </Layout>
    )
}