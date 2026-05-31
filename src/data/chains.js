/**
 * Static chain registry for the landing page ChainsSection.
 * Groups chains by type for display purposes.
 * Sourced from TCF_SPECIFICATION §5.4 — Supported Chains (Initial Set).
 */

export const CHAIN_TYPES = {
  evm: 'EVM Chains',
  cosmos: 'Cosmos Ecosystem',
  smart_contract: 'Non-EVM Smart Contract Chains',
  single_asset: 'Single-Asset Chains',
}

export const SUPPORTED_CHAINS = [
  // ── EVM ──────────────────────────────────────────────────────────────────
  { name: 'Ethereum',          shortName: 'eth',      type: 'evm',            nativeToken: 'ETH'  },
  { name: 'Optimism',          shortName: 'op',       type: 'evm',            nativeToken: 'ETH'  },
  { name: 'Arbitrum',          shortName: 'arb',      type: 'evm',            nativeToken: 'ETH'  },
  { name: 'Base',              shortName: 'base',     type: 'evm',            nativeToken: 'ETH'  },
  { name: 'zkSync',            shortName: 'zksync',   type: 'evm',            nativeToken: 'ETH'  },
  { name: 'Scroll',            shortName: 'scroll',   type: 'evm',            nativeToken: 'ETH'  },
  { name: 'Sei EVM',           shortName: 'sei',      type: 'evm',            nativeToken: 'SEI'  },
  { name: 'Avalanche C-Chain', shortName: 'avax',     type: 'evm',            nativeToken: 'AVAX' },
  { name: 'Polygon',           shortName: 'matic',    type: 'evm',            nativeToken: 'MATIC'},
  { name: 'BNB Smart Chain',   shortName: 'bsc',      type: 'evm',            nativeToken: 'BNB'  },
  { name: 'Sonic',             shortName: 'sonic',    type: 'evm',            nativeToken: 'S'    },
  { name: 'Monad',             shortName: 'monad',    type: 'evm',            nativeToken: 'MON'  },
  { name: 'Berachain',         shortName: 'bera',     type: 'evm',            nativeToken: 'BERA' },
  { name: 'TRON',              shortName: 'tron',     type: 'evm',            nativeToken: 'TRX'  },
  // ── Cosmos ────────────────────────────────────────────────────────────────
  { name: 'Cosmos Hub',        shortName: 'atom',     type: 'cosmos',         nativeToken: 'ATOM' },
  { name: 'Celestia',          shortName: 'tia',      type: 'cosmos',         nativeToken: 'TIA'  },
  // ── Non-EVM smart contract ────────────────────────────────────────────────
  { name: 'Solana',            shortName: 'sol',      type: 'smart_contract', nativeToken: 'SOL'  },
  { name: 'Aptos',             shortName: 'apt',      type: 'smart_contract', nativeToken: 'APT'  },
  { name: 'Sui',               shortName: 'sui',      type: 'smart_contract', nativeToken: 'SUI'  },
  // ── Single-asset ──────────────────────────────────────────────────────────
  { name: 'Bitcoin',           shortName: 'btc',      type: 'single_asset',   nativeToken: 'BTC'  },
  { name: 'XRP Ledger',        shortName: 'xrp',      type: 'single_asset',   nativeToken: 'XRP'  },
  { name: 'Cardano',           shortName: 'ada',      type: 'single_asset',   nativeToken: 'ADA'  },
  { name: 'Stellar',           shortName: 'xlm',      type: 'single_asset',   nativeToken: 'XLM'  },
  { name: 'Tezos',             shortName: 'xtz',      type: 'single_asset',   nativeToken: 'XTZ'  },
  { name: 'Polkadot',          shortName: 'dot',      type: 'single_asset',   nativeToken: 'DOT'  },
]

export const chainsByType = Object.fromEntries(
  Object.keys(CHAIN_TYPES).map((type) => [
    type,
    SUPPORTED_CHAINS.filter((c) => c.type === type),
  ])
)
