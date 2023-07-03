---
title: Introduction
pageTitle: Sado - Self-Authenticating Decentralized Orderbooks
description: A protocol for selling, buying and trading Ordinals on the bitcoin network.
---

Our primary objective in the development of our SDK is to facilitate seamless interaction with services that utilize the Sado Protocol on the bitcoin network. We endeavor to make this experience as intuitive and straightforward as possible for all developers. To this end, we are diligently working on a JavaScript SDK and a CLI interface that will provide a simple yet effective means of interfacing with Sado compliant API endpoints. This will ensure that the information you require is readily accessible and easily retrievable.

At present, we are in the initial stages of active development. As our features and functionality evolve and expand, so too will our documentation. Our commitment is to provide a comprehensive and centralized source of information that developers can easily access and learn from. We appreciate your patience and support during this stage of growth and look forward to providing you with a robust and user-friendly solution.

{% callout title="Important Note!" type="warning" %}
Sado SDK is currently in ALPHA stage development and is NOT production ready. Use with caution and at your own risk.
{% /callout %}

---

## Installation

To get started with the JavaScript SDK you can install with [NPM](https://www.npmjs.com/) or use [Browserify](https://browserify.org/) if you are running in a non bundled JavaScript ecosystem.

```sh
$ npm i --save @sadoprotocol/sado-sdk
```

If you want to use the SDK in a terminal environment you can also install our command line interface package.

```sh
$ npm i -g @sadoprotocol/sado-cli
```

---

## Quick Start

Once installed you can create a new Sado SDK client instance.

{% preview tabs=["JavaScript", ".sado"] %}

  {% preview-section %}

    ```ts {% preview=true %}
    import { Sado } from "@sadoprotocol/sado-sdk";

    const sado = new Sado("https://api.sado.space", {
      network: new NetworkMemoryProvider()
    });
    ```

    {% preview-object title="Parameters" %}
      {% preview-object-item name="url" type="string" required=true description="URL pointing to a sado protocol compliant JSON-RPC 2.0 API." /%}
      {% preview-object-item name="options" type="object" required=false description="Options to tweak the behavior of the client." /%}
      {% preview-object-item name="options.network" type="NetworkProvider" type-link="https://github.com/sadoprotocol/sado-js/blob/main/packages/sado-sdk/src/Network/Providers/MemoryProvider.ts" required=false description="Provide a custom network provider, by default a in memory provider is used and will be reset between session. To persist the provider a platform specific provider has to be registered with the client instance." /%}
      {% preview-object-item name="options.services" type="object" type-link="https://github.com/sadoprotocol/sado-js/blob/main/packages/sado-sdk/src/SadoClient.ts#L65-L69" required=false description="Override the default services allowing for custom implementations of the services that the sado client sdk uses to execute commands. Useful for testing and mocking." /%}
    {% /preview-object %}

    {% preview-object title="Response" %}
      {% preview-object-item name="sado" type="Sado" type-link="https://github.com/sadoprotocol/sado-js/blob/main/packages/sado-sdk/src/Sado.ts" description="Sado protocol SDK instance." /%}
    {% /preview-object %}

  {% /preview-section %}

  {% preview-section %}

    ``` {% preview=true %}
    url=https://api.sado.space
    network=mainnet
    ```

    {% preview-object title="Parameters" %}
      {% preview-object-item name="url" type="string" required=true description="URL pointing to a sado protocol compliant JSON-RPC 2.0 API." /%}
      {% preview-object-item name="network" type="string" required=true description="Which network to use when performing CLI commands." %}
        {% preview-object-value name="mainnet" description="Transactions on a mainnet are recorded on the blockchain permanently and are visible to the public. Transactions are irreversible so take all possble precautions when relaying your transactions." /%}
        {% preview-object-value name="testnet" description="Transactions on testnet are used for testing and development purposes and are not recorded on the blockchain permanently." /%}
        {% preview-object-value name="regtest" description="Transactions on regtest are used for testing and development purposes and are hosted independently of the two other networks. Regtest can be customized to behave more favorably for these purposes and transactions are not recorded on the blockchain permanently." /%}
      {% /preview-object-item %}
    {% /preview-object %}

  {% /preview-section %}

{% /preview %}

{% callout title="Hint" %}
You can create a `.sado` file in your home folder for the CLI to consume when performing sado commands on the command line.
{% /callout %}

---

## Getting Help

Sado SDK is a open source project and we encourage you to get involved. If you have any issues, suggestions or want to contribute to the project, please feel free to head over to the [GitHub](https://github.com/sadoprotocol/sado-js) repository and submit an issue or pull request.

### Submit an issue

Submitting an issue is an effective way to report bugs, request new features, or seek assistance with a problem. To do this, visit the Sado GitHub repository and create a new issue. Be sure to include a descriptive title and a clear explanation of the problem or suggestion, along with any relevant files, screenshots, or logs to help others understand your issue.
