# Projeto Calliope para Microsoft MakeCode

Este projeto está hospedado em https://makecode.calliope.cc.

## Editor hospedado e build

Jenkins build: https://ci2.dot.net/job/Private/job/pxt_project_teal/job/master/


### Comentários sobre o build

- O build libs/core/dal.d.ts precisa de alguma intervenção, porque o analisador `#define`  não analisa `#ifdef` e portanto, possui alguns conflitos com dupla definição de constantes.

![](http://calliope.cc/content/1-ueber-mini/mini_board.png)

## Servidor local 

O servidor local permite executar o editor e a documentação partindo de seu computador.

### COnfiguração inicial

Os comandos a seguir são feitos uma só vez, após a sincronização do repositório em sua máquina.

* Veja os requisitos para [pxt](https://github.com/Microsoft/pxt)
* [clone este repositório](https://help.github.com/articles/cloning-a-repository/) para seu computador e vá na paste de projeto
```
git clone https://github.com/microsoft/pxt-calliope
cd pxt-calliope
```
* instale a linha de comando PXT (adicione ``sudo`` para terminais Mac/Linux).
```
npm install -g pxt
```
* instale as dependências
```
npm install
```

### Executando

Execute este comando para abrir um servir web local (adicione ``sudo`` para terminais Mac/Linux).
```
pxt serve
```
Se o servidor local abrir no browser errado, tenha certeza de copiara URL contendo o token local. 
Do contrário, o editor não será capaz de carregar os projetos.

Se você precisar modificar os arquivos `.cpp`, ligue a sua compilação yotta com o comando ``-yt`` (adicione ``sudo`` para terminais Mac/Linux). No Windows, você deve estar executando
do terminal (prompt de comando) ``Run Yotta``.
```
pxt serve -yt
```

## Atualizações

Para atualizar a sua versão do PXT e ter certeza que você está executando as últimas versões das ferramentas, execute (adicione ``sudo`` para terminais Mac/Linux)
```
pxt update
```

Mais instruções em https://github.com/Microsoft/pxt#running-a-target-from-localhost 

## Testando

O build executa automaticamente o seguinte:

* Assegura que os pacotes pré-instalados(built-in) compilam
* `pxt run` in `libs/lang-test*` - isso vai executar o teste no executador de linha de comando; 
  exitem um número de afirmações em ambos.
* `pxt testdir` in `tests` - isso garante que todos os arquivos compilam e geram arquivos .hex.

Para testar algo no dispositivo:

* Faça um `pxt deploy` em `libs/lang-test*` - isso deve mostrar `1` ou `2` na tela (e não uma cara triste)
* execute `pxt testdir` em `tests` e implante alguns dos arquivos hex de `tests/built`

A fonte `lang-test0` vem do pacote `pxt-core`. Isto é também testado lá com `pxt run`. 

## Código de Conduta

Este projeto adotou [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). Para mais informações veja o [FAQ do Code of Conduct](https://opensource.microsoft.com/codeofconduct/faq/) ou contate [opencode@microsoft.com](mailto:opencode@microsoft.com) com qualquer questão adicional ou comentário.
