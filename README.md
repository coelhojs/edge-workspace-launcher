# Edge Workspace Launcher

Extensão **Manifest V3** para o Microsoft Edge que substitui a página de **Nova Guia (New Tab)** por um painel escuro, limpo e minimalista para abertura rápida de **Edge Workspaces**.

## Funcionalidades

- Substitui a Nova Guia (`chrome_url_overrides.newtab`) por uma tela de seleção de Workspaces.
- Cadastro de nome e link de compartilhamento persistido localmente via `chrome.storage.local`.
- Listagem em cards clicáveis com opção individual de exclusão.
- Abertura do Workspace em uma nova janela (`chrome.windows.create`) com fechamento automático da guia inicial.

## Instalação Descompactada no Microsoft Edge

1. Abra o Microsoft Edge e acesse `edge://extensions/` na barra de endereços.
2. No menu lateral esquerdo (ou canto inferior esquerdo), ative a chave **Modo de desenvolvedor** (*Developer mode*).
3. No topo da página, clique no botão **Carregar sem pacote** (*Load unpacked*).
4. Selecione a pasta `D:\dev\edge-workspace-launcher` e confirme.
5. Abra uma nova guia (`Ctrl + T`) e, caso o Edge exiba um aviso perguntando se deseja manter a alteração na página de nova guia, clique em **Manter alterações** (*Keep changes*).

## Como obter o link de um Workspace

1. Abra o Workspace desejado no Microsoft Edge.
2. Clique no botão de menu do Workspace no canto superior esquerdo da janela.
3. Clique em **Convidar** (*Invite*) e depois em **Copiar link** (*Copy link*).
4. Cole o link no formulário da extensão na Nova Guia e clique em **Adicionar**.
