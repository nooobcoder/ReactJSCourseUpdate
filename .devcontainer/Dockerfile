# Copyright (c) 2021 Tailscale Inc & AUTHORS All rights reserved.
# Use of this source code is governed by a BSD-style
# license that can be found in the LICENSE file.

FROM mcr.microsoft.com/vscode/devcontainers/universal:linux as builder
USER root

# Magic DNS in a container where /etc/resolv.conf is a bind mount needed
# extra support, currently on a development branch.
WORKDIR /go/src/tailscale
COPY . ./
RUN git clone https://github.com/tailscale/tailscale.git && cd tailscale && \
    go mod download && \
    go install -mod=readonly ./cmd/tailscaled ./cmd/tailscale
COPY . ./

FROM mcr.microsoft.com/vscode/devcontainers/universal:linux
USER root

RUN apt-get update && apt-get install -y curl gpg dnsutils
COPY tailscaled /etc/init.d
COPY --from=builder /go/bin/tailscaled /usr/sbin/tailscaled
COPY --from=builder /go/bin/tailscale /usr/bin/tailscale

RUN mkdir -p /var/run/tailscale /var/cache/tailscale /var/lib/tailscale

USER codespace
RUN sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
ENV SHELL=zsh
RUN echo "alias gits='git status'" >> $HOME/.zshrc
RUN echo "alias ls='ls -GFh'" >> $HOME/.zshrc
ENV NVM_DIR="$HOME/.nvm"
RUN echo ". ~/.nvm/nvm.sh" >> $HOME/.zshrc
RUN sed -i 's/plugins=(git)/plugins=(git npm docker-compose docker)/' $HOME/.zshrc
RUN git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
RUN sed -i 's/ZSH_THEME="robbyrussell"/ZSH_THEME="powerlevel10k\/powerlevel10k"/' $HOME/.zshrc
RUN wget https://gist.githubusercontent.com/trumbitta/dc0c235832c5851813746d5886e40c56/raw/4663769f792bc9990b6b18242819b37a89a8ce53/.p10k.zsh -O $HOME/.p10k.zsh
RUN echo "[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh" >> $HOME/.zshrc
