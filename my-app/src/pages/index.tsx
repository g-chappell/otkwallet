import { useState } from 'react';
import type { NextPage } from 'next';
import { useWallet, CardanoWallet } from '@meshsdk/react';

const Home: NextPage = () => {
    const { connected, wallet } = useWallet();
    const [assets, setAssets] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);

    const getAssets = async () => {
        if (wallet) {
            setLoading(true);
            try {
                const _assets = await wallet.getAssets();
                setAssets(_assets);
            } catch (error) {
                console.error('Error fetching assets:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div>
            <h1>Connect Wallet</h1>
            <CardanoWallet />
            {connected && (
                <>
                    <h1>Get Wallet Assets</h1>
                    {assets ? (
                        <pre>
                            <code className="language-js">
                                {JSON.stringify(assets, null, 2)}
                            </code>
                        </pre>
                    ) : (
                        <button
                            type="button"
                            onClick={getAssets}
                            disabled={loading}
                            style={{
                                margin: '8px',
                                backgroundColor: loading ? 'orange' : 'grey',
                            }}
                        >
                            Get Wallet Assets
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

export default Home;
