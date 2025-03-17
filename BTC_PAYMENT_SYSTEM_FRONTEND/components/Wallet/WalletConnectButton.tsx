"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    ConnectWallet,
    ConnectWalletDropdownMenu,
    ConnectWalletDropdownMenuButton,
    ConnectWalletDropdownMenuItems,
    ConnectWalletDropdownMenuItem,
    ConnectWalletDropdownMenuAddressItem,
    ConnectWalletDropdownMenuDisconnectItem
} from "@nfid/identitykit/react";
import { Button } from "@/components/ui/button";
import { Wallet, Copy, ExternalLink, LogOut } from "lucide-react";

interface WalletConnectButtonProps {
    isMobile?: boolean;
}

// Custom connect button component
const CustomConnectButton = ({ isMobile, ...props }: any) => {
    // Compact version for mobile navbar
    if (isMobile) {
        return (
            <Button
                size="icon"
                className="bg-gradient-to-r from-violet-600 to-indigo-400 hover:from-violet-700 hover:to-indigo-500 text-white shadow-md hover:shadow-lg transition-shadow w-8 h-8 rounded-full p-0"
                {...props}
            >
                <Wallet className="h-4 w-4" />
            </Button>
        );
    }

    // Standard version
    return (
        <Button
            size="sm"
            className="bg-gradient-to-r from-yellow-600 to-orange-400 hover:from-yellow-700 hover:to-orange-500 text-white shadow-md hover:shadow-lg transition-shadow flex items-center gap-2"
            {...props}
        >
            <Wallet className="h-4 w-4" />
            <span>Connect Wallet</span>
        </Button>
    );
};

// Custom connected button component
const CustomConnectedButton = ({ connectedAccount, icpBalance, isMobile, ...props }: any) => {
    // Format the account string to show only first and last 4 chars
    const formattedAccount = connectedAccount ?
        `${connectedAccount.substring(0, 4)}...${connectedAccount.substring(connectedAccount.length - 4)}` :
        "Connected";

    // Format balance with 2 decimal places if available
    const formattedBalance = icpBalance ?
        `${parseFloat(icpBalance).toFixed(2)} ICP` :
        "";

    // Compact version for mobile navbar
    if (isMobile) {
        return (
            <Button
                size="icon"
                variant="outline"
                className="border-violet-500 text-violet-700 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-all w-8 h-8 rounded-full p-0 relative"
                {...props}
            >
                <Wallet className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            </Button>
        );
    }

    // Standard version
    return (
        <Button
            size="sm"
            variant="outline"
            className="border-violet-500 text-violet-700 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-all flex items-center gap-2"
            {...props}
        >
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span>{formattedAccount}</span>
            {icpBalance && !isMobile && (
                <span className="font-medium">{formattedBalance}</span>
            )}
        </Button>
    );
};

// Custom dropdown menu component
const CustomDropdownMenu = ({ connectedAccount, icpBalance, disconnect, ...props }: any) => {
    // Get the wallet type from the connectedAccount
    const getWalletType = () => {
        if (!connectedAccount) return "Wallet";

        // Logic to determine wallet type from the account format
        if (connectedAccount.startsWith("principal")) return "Internet Identity";
        if (connectedAccount.includes("plug")) return "Plug Wallet";
        if (connectedAccount.includes("nfid")) return "NFID Wallet";
        if (connectedAccount.includes("stoic")) return "Stoic Wallet";
        if (connectedAccount.includes("oisy")) return "OISY Wallet";
        return "ICP Wallet";
    };

    const copyToClipboard = () => {
        if (connectedAccount) {
            navigator.clipboard.writeText(connectedAccount);
            // Could add a toast notification here
        }
    };

    const openExplorer = () => {
        if (connectedAccount) {
            window.open(`https://dashboard.internetcomputer.org/account/${connectedAccount}`, '_blank');
        }
    };

    return (
        <ConnectWalletDropdownMenu>
            <ConnectWalletDropdownMenuButton>
                <CustomConnectedButton
                    connectedAccount={connectedAccount}
                    icpBalance={icpBalance}
                    isMobile={props.isMobile}
                />
            </ConnectWalletDropdownMenuButton>

            <ConnectWalletDropdownMenuItems>
                <ConnectWalletDropdownMenuItem className="py-3">
                    <div className="font-semibold text-gray-800 dark:text-gray-200">
                        {getWalletType()}
                    </div>
                </ConnectWalletDropdownMenuItem>

                <ConnectWalletDropdownMenuAddressItem
                    value={connectedAccount}
                    className="flex items-center justify-between py-3 px-4 hover:bg-violet-50 dark:hover:bg-violet-900/10 text-sm"
                >
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 cursor-pointer" onClick={copyToClipboard}>
                        <Copy className="h-4 w-4 text-violet-500" />
                        <span>Copy Address</span>
                    </div>
                </ConnectWalletDropdownMenuAddressItem>

                <ConnectWalletDropdownMenuItem className="py-3 px-4 hover:bg-violet-50 dark:hover:bg-violet-900/10">
                    <div
                        className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm cursor-pointer"
                        onClick={openExplorer}
                    >
                        <ExternalLink className="h-4 w-4 text-violet-500" />
                        <span>View on Explorer</span>
                    </div>
                </ConnectWalletDropdownMenuItem>

                <ConnectWalletDropdownMenuItem className="border-t border-gray-200 dark:border-gray-800 mt-1 pt-1">
                    <ConnectWalletDropdownMenuDisconnectItem
                        onClick={disconnect}
                        className="flex items-center gap-2 text-red-600 dark:text-red-400 py-3 px-4 hover:bg-red-50 dark:hover:bg-red-900/10 text-sm w-full text-left cursor-pointer"
                    >
                        <LogOut className="h-4 w-4" />
                        <span>Disconnect Wallet</span>
                    </ConnectWalletDropdownMenuDisconnectItem>
                </ConnectWalletDropdownMenuItem>
            </ConnectWalletDropdownMenuItems>
        </ConnectWalletDropdownMenu>
    );
};

const WalletConnectButton = ({ isMobile = false }: WalletConnectButtonProps) => {
    const [mounted, setMounted] = useState<any>(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
        >
            <ConnectWallet
                connectButtonComponent={(props: any) => (
                    <CustomConnectButton {...props} isMobile={isMobile} />
                )}
                connectedButtonComponent={(props: any) => (
                    <CustomConnectedButton {...props} isMobile={isMobile} />
                )}
                dropdownMenuComponent={(props: any) => (
                    <CustomDropdownMenu {...props} isMobile={isMobile} />
                )}
            />
        </motion.div>
    );
};

export default WalletConnectButton;