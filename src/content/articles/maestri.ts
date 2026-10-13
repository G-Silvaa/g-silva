import type { Article } from '../site'

/**
 * Artigo: o time de agentes no Maestri.
 *
 * Os trechos de papel e a linha do LOG.md são copiados do setup real
 * (`.maestri/roles` e `maestri-memoria`). Os números vêm das fontes listadas
 * no fim. As capturas têm o nome do projeto borrado de propósito.
 */
export const maestri: Article = {
  slug: 'time-de-agentes-no-maestri',
  date: '2026-10-13',
  tags: ['Claude Code', 'Maestri', 'Agentes', 'Revisão'],
  cover: '/articles/maestri/canvas.png',

  title: {
    pt: 'Cinco agentes e um contrato: como uso o Maestri para trabalhar com IA sem perder o controle',
    en: 'Five agents and one contract: how I use Maestri to work with AI without losing control',
  },
  lines: {
    pt: ['Cinco agentes,', '*um contrato.*'],
    en: ['Five agents,', '*one contract.*'],
  },
  lead: {
    pt: 'Um agente sozinho é rápido até o contexto encher e o código sair quase certo. Montei no Maestri um time de cinco instâncias do Claude Code com papéis fixos, um contrato escrito e uma memória compartilhada. Aqui estão o desenho, o porquê de cada regra e o que eu ainda faço na mão.',
    en: 'A single agent is fast until the context fills up and the code comes out almost right. In Maestri I set up a team of five Claude Code instances with fixed roles, a written contract and a shared memory. Here is the design, the reason behind each rule, and what I still do by hand.',
  },

  sources: [
    {
      title: '2025 Developer Survey — AI',
      by: 'Stack Overflow, 2025',
      url: 'https://survey.stackoverflow.co/2025/ai',
    },
    {
      title: 'Best practices for Claude Code',
      by: 'Anthropic, documentação do Claude Code',
      url: 'https://code.claude.com/docs/en/best-practices',
    },
    {
      title: 'Lost in the Middle: How Language Models Use Long Contexts',
      by: 'Liu et al., TACL 2024',
      url: 'https://aclanthology.org/2024.tacl-1.9/',
    },
    {
      title: 'Maestri',
      by: 'Site oficial',
      url: 'https://themaestri.app',
    },
    {
      title: 'Building effective agents',
      by: 'Anthropic, 2024',
      url: 'https://www.anthropic.com/engineering/building-effective-agents',
    },
    {
      title: 'How we built our multi-agent research system',
      by: 'Anthropic, 2025',
      url: 'https://www.anthropic.com/engineering/multi-agent-research-system',
    },
    {
      title: 'LLM Evaluators Recognize and Favor Their Own Generations',
      by: 'Panickssery, Bowman e Feng, NeurIPS 2024',
      url: 'https://papers.nips.cc/paper_files/paper/2024/hash/7f1f0218e45f5414c79c0679633e47bc-Abstract-Conference.html',
    },
    {
      title: 'We Have a Package for You! A Comprehensive Analysis of Package Hallucinations by Code Generating LLMs',
      by: 'Spracklen et al., USENIX Security 2025',
      url: 'https://www.usenix.org/conference/usenixsecurity25/presentation/spracklen',
    },
  ],

  body: {
    pt: [
      {
        kind: 'p',
        text: 'Quem usa agente de código todo dia conhece o padrão: o começo é rápido, e uma hora depois a sessão está cheia de arquivos lidos, tentativas descartadas e instruções que o modelo parece ter esquecido. A documentação do Claude Code trata isso como a restrição principal: a janela de contexto enche rápido, e o desempenho cai à medida que ela enche [2]. Não é defeito de um modelo só. Modelos de linguagem aproveitam pior a informação que fica no meio de entradas longas [3].',
      },
      {
        kind: 'p',
        text: 'O segundo problema é mais traiçoeiro. Na pesquisa do Stack Overflow de 2025, 66% dos desenvolvedores apontaram como principal frustração as soluções de IA "quase certas, mas não exatamente", e 45% disseram que depurar código gerado leva mais tempo [1]. O tempo que a IA economiza escrevendo, ela pode devolver em correção.',
      },
      {
        kind: 'p',
        text: 'Meu objetivo com o Maestri não foi deixar a LLM mais eficiente. O modelo é o mesmo. O que muda é o processo em volta dele: quem planeja, quem implementa, quem testa, quem confere e onde fica registrado o que foi decidido.',
      },

      { kind: 'h2', text: 'O que é o Maestri' },
      {
        kind: 'p',
        text: 'O Maestri é um canvas infinito para orquestrar agentes de código. Cada terminal vira um bloco no canvas, ao lado de notas e desenhos, e terminais ligados por uma linha conseguem trocar mensagens, delegar tarefas e fazer perguntas uns aos outros. Ele também guarda instruções reutilizáveis como papéis (roles), que você atribui aos agentes, e cria andares (floors), que são cópias isoladas do workspace. Funciona com Claude Code, Codex, OpenCode ou um shell comum [4].',
      },
      {
        kind: 'p',
        text: 'Uso esse setup em vários projetos. O formato que mais se repete é o das capturas abaixo: cinco terminais do Claude Code para uma aplicação com front e back em repositórios separados.',
      },
      {
        kind: 'figure',
        src: '/articles/maestri/canvas.png',
        alt: 'Canvas do Maestri com cinco terminais do Claude Code ligados por linhas tracejadas: QA, arquiteto, front, back e testes automatizados.',
        caption: 'O time no canvas. O arquiteto está ligado aos dois builders, ao agente de testes e ao QA.',
      },

      { kind: 'h2', text: 'O time: cinco papéis, nenhum faz tudo' },
      {
        kind: 'list',
        items: [
          '**Arquiteto**: lê o código dos dois lados, escreve o plano e delega. Não edita código-fonte, nem quando a tarefa parece trivial.',
          '**Builder do front** e **builder do back**: cada um implementa só a sua fatia, no seu repositório, e só nos arquivos que o contrato diz que são dele.',
          '**Testes automatizados**: escreve testes a partir do contrato, sem ler o código que está sendo escrito.',
          '**QA**: revisa os dois diffs contra o contrato, roda as suítes e reporta. Não corrige nada.',
        ],
      },
      {
        kind: 'p',
        text: 'É o padrão que a Anthropic chama de orquestrador e trabalhadores: um modelo central quebra a tarefa, delega para outros e junta os resultados [5]. A diferença é que aqui o orquestrador não pode tocar no código. Se pudesse, o atalho viraria regra.',
      },
      {
        kind: 'figure',
        src: '/articles/maestri/papel-arquiteto.png',
        alt: 'Tela de edição de terminal no Maestri, aba Agente, com os papéis Arquiteto, Builder, Testes automatizados e QA. O papel Arquiteto está selecionado.',
        caption: 'Os papéis ficam salvos no Maestri. Ao iniciar, ele copia as instruções para a pasta .maestri do projeto.',
      },
      {
        kind: 'p',
        text: 'Nem todo papel precisa do mesmo modelo. No terminal de testes eu troquei para o Sonnet, que é mais barato. O arquiteto e o QA ficam com o Opus, porque é ali que um erro de julgamento custa mais.',
      },

      { kind: 'h2', text: 'O contrato é a fonte de verdade' },
      {
        kind: 'p',
        text: 'Antes de qualquer linha de código, o arquiteto escreve um `CONTRATO.md` de no máximo 60 linhas, sempre com as mesmas nove seções:',
      },
      {
        kind: 'code',
        caption: 'Trecho do papel do arquiteto.',
        text: `1. Objetivo — uma frase.
2. Contexto — o que existe hoje e o que você verificou no código.
3. Critério de aceite — verificável por comando ou clique.
4. Fora de escopo.
5. Fatias — "front" e "back", cada uma com critério de pronto.
6. Interfaces compartilhadas — assinatura exata: rota, método, nome de
   campo, tipo, opcionalidade, formato de data, corpo de erro, status HTTP.
7. Posse de arquivo — caminho completo. Cada arquivo pertence a uma fatia só.
8. Riscos.
9. Perguntas em aberto — se houver alguma, pare e pergunte ao usuário.`,
      },
      {
        kind: 'p',
        text: 'Isso segue o que a documentação do Claude Code recomenda para funcionalidades maiores: uma especificação autocontida, que nomeia arquivos e interfaces, diz o que está fora de escopo e termina com um passo de verificação [2]. Duas seções pesam mais que as outras. **Interfaces compartilhadas** obriga a fixar o formato exato antes de os builders começarem, então front e back não precisam adivinhar o que o outro vai mandar. **Posse de arquivo** impede que dois agentes editem o mesmo arquivo ao mesmo tempo.',
      },
      {
        kind: 'p',
        text: 'E existe uma trava humana: depois de escrever o contrato, o arquiteto **para e espera a minha aprovação**. Ele não pode delegar no mesmo turno. É o ponto mais barato para corrigir um mal-entendido, antes de cinco agentes gastarem tokens em cima dele.',
      },

      { kind: 'h2', text: 'Memória que não depende do contexto' },
      {
        kind: 'p',
        text: 'Cada terminal tem a própria janela de contexto, e ela vai ser limpa ou compactada em algum momento. Por isso a memória do time fica em arquivos, fora dos repositórios: o `CONTRATO.md` e um `LOG.md`. Todo papel começa com a mesma instrução: ao iniciar, ler o contrato e as últimas entradas do log; ao terminar qualquer etapa, acrescentar uma linha; nunca apagar linhas antigas.',
      },
      {
        kind: 'code',
        caption: 'A primeira linha real do LOG.md: data, quem, o que fez, arquivos tocados e resultado.',
        text: '2026-09-21 17:56 | arquiteto | inicialização: maestri list (time: front, back,\ntestes automatizados, QA); CONTRATO.md e LOG.md não existiam | LOG.md criado |\nok, aguardando task',
      },
      {
        kind: 'p',
        text: 'Na captura do canvas dá para ver isso funcionando. Ao abrir, os dois builders leram a memória, perceberam que ainda não havia contrato e ficaram esperando, em vez de inventar uma tarefa.',
      },

      { kind: 'h2', text: 'Quem faz não é quem confere' },
      {
        kind: 'p',
        text: 'Esta é a parte que mais evita erro. Um modelo avaliando o próprio texto tende a favorecê-lo: um trabalho apresentado na NeurIPS 2024 mostrou que LLMs reconhecem as próprias gerações e dão notas mais altas a elas, mesmo quando avaliadores humanos as consideram equivalentes [7]. A documentação do Claude Code vai na mesma direção: um contexto novo revisa melhor porque não está enviesado pelo código que acabou de escrever [2].',
      },
      { kind: 'p', text: 'Por isso o time tem duas separações:' },
      {
        kind: 'list',
        items: [
          '**O agente de testes não lê a implementação.** Ele escreve a partir do contrato. Se precisar ver o código para saber o que testar, o contrato está incompleto, e ele avisa o arquiteto. Cada requisito ganha o caminho feliz e pelo menos dois casos de borda, e cada teste precisa responder a uma pergunta: que comportamento errado faria este teste falhar?',
          '**O QA julga o código contra o requisito, não contra a explicação de quem implementou.** Ele não pede nem aceita justificativa. A ordem de busca é fixa: critério de aceite, desencontro entre front e back (campo a campo, e sempre bloqueante), caso de borda, erro silenciado, quebra em outro ponto do sistema e arquivo tocado fora da posse.',
        ],
      },
      {
        kind: 'p',
        text: 'É o ciclo que a Anthropic chama de avaliador e otimizador: um modelo gera, outro avalia e devolve, em laço [5]. Com um limite: no máximo duas rodadas. Se na terceira aparecer um problema novo, o problema não está no código, está no contrato, e o arquiteto para e fala comigo.',
      },
      {
        kind: 'note',
        text: 'Um cuidado: um revisor instruído a achar falhas quase sempre acha alguma, mesmo quando o trabalho está bom [2]. Por isso o QA classifica cada achado como bloqueante, importante ou menor, e quem decide o que entra sou eu.',
      },

      { kind: 'h2', text: 'Os erros que esse desenho tenta impedir' },
      {
        kind: 'list',
        items: [
          '**Front e back que não conversam.** A interface é fixada no contrato, e a comparação campo a campo é o segundo item da lista do QA.',
          '**Dois agentes no mesmo arquivo.** A tabela de posse define um dono para cada arquivo.',
          '**Teste que só confirma o que o código já faz.** Os testes são escritos sem ver a implementação.',
          '**"Verificado" sem evidência.** Todo papel tem a regra de nunca afirmar algo que não executou. O que não rodou entra no relatório como "não verificado".',
          '**Erro engolido.** Catch vazio e erro que vira sucesso estão na lista do QA.',
          '**Servidores e portas em conflito.** Só o arquiteto sobe servidores, em background e com log em arquivo.',
          '**Correção em loop.** O limite de duas rodadas devolve o problema para o plano.',
        ],
      },

      { kind: 'h2', text: 'De onde vem o tempo economizado' },
      {
        kind: 'p',
        text: 'Desde que passei a trabalhar assim, economizo bastante tempo, e não é porque o modelo ficou mais rápido. É por estes motivos:',
      },
      {
        kind: 'list',
        items: [
          '**Trabalho em paralelo.** Front, back e testes andam ao mesmo tempo, cada um no seu terminal, em vez de um agente só fazer tudo em sequência.',
          '**Contexto pequeno e focado.** Cada agente carrega só a sua fatia e o contrato, não a conversa inteira do projeto. Com menos coisa na janela, diminui a chance de o modelo se perder ou alucinar, ao contrário da sessão única que vai enchendo [2][3].',
          '**Menos retrabalho.** Como a interface é combinada antes, front e back não precisam ser refeitos depois para encaixar.',
          '**Erro pego antes de chegar em mim.** Os testes e o QA rodam antes da minha revisão. Quando eu leio o diff, boa parte dos problemas já foi corrigida.',
          '**Nada de explicar tudo de novo.** A memória em arquivo deixa qualquer terminal retomar de onde parou depois de limpar o contexto, sem eu repetir o que já foi decidido.',
        ],
      },

      { kind: 'h2', text: 'O que continua sendo meu' },
      {
        kind: 'p',
        text: 'Aprovo o contrato antes de qualquer delegação. Leio o diff linha a linha antes do commit, a mesma dupla camada de revisão que descrevo na [página de IA](/ai). Nenhum agente faz push.',
      },
      {
        kind: 'p',
        text: 'E fico atento ao que nenhum papel cobre bem: dependências. Um estudo apresentado no USENIX Security 2025 encontrou, em média, pelo menos 5,2% de pacotes inexistentes no código gerado por modelos comerciais e 21,7% no de modelos abertos [8]. Quando aparece pacote novo no diff, eu confiro na mão.',
      },

      { kind: 'h2', text: 'Custos e limites' },
      {
        kind: 'p',
        text: 'Orquestrar agentes não sai de graça. A Anthropic mediu que agentes usam cerca de 4 vezes mais tokens que um chat, e sistemas com vários agentes, cerca de 15 vezes [6]. No mesmo texto, ela avisa que a maioria das tarefas de código tem menos trabalho realmente paralelo do que uma pesquisa [6]. Concordo, e por isso só divido em front e back: depois que a interface está fixada, os dois lados ficam de fato independentes.',
      },
      {
        kind: 'p',
        text: 'Para tarefa pequena, o time inteiro é exagero. A Anthropic recomenda começar pela solução mais simples e só aumentar a complexidade quando for preciso [5], e o meu arquiteto tem essa regra escrita: se a tarefa for trivial, ele me diz que é caso de agente solo. Às vezes ainda é mais rápido eu mesmo escrever.',
      },

      { kind: 'h2', text: 'Conclusão' },
      {
        kind: 'p',
        text: 'O ganho não vem de um modelo melhor. Vem de tratar agentes como um time: papéis que não se sobrepõem, um contrato escrito antes do código, memória em arquivo e revisão feita por quem não escreveu. A responsabilidade pelo que vai para produção continua sendo minha.',
      },
    ],

    en: [
      {
        kind: 'p',
        text: 'Anyone who uses a coding agent every day knows the pattern: the start is fast, and an hour later the session is full of files read, discarded attempts and instructions the model seems to have forgotten. The Claude Code documentation treats this as the main constraint: the context window fills up fast, and performance degrades as it fills [2]. It is not one model’s flaw. Language models make worse use of information that sits in the middle of long inputs [3].',
      },
      {
        kind: 'p',
        text: 'The second problem is sneakier. In the 2025 Stack Overflow survey, 66% of developers named "AI solutions that are almost right, but not quite" as their top frustration, and 45% said debugging AI-generated code takes more time [1]. The time AI saves by writing, it can take back in fixes.',
      },
      {
        kind: 'p',
        text: 'My goal with Maestri was not to make the LLM more efficient. The model is the same. What changes is the process around it: who plans, who implements, who tests, who checks, and where the decisions are written down.',
      },

      { kind: 'h2', text: 'What Maestri is' },
      {
        kind: 'p',
        text: 'Maestri is an infinite canvas for orchestrating coding agents. Each terminal becomes a block on the canvas, next to notes and sketches, and terminals connected by a line can message each other, delegate tasks and ask each other questions. It also stores reusable instructions as roles that you assign to agents, and creates floors, which are isolated copies of the workspace. It works with Claude Code, Codex, OpenCode or a plain shell [4].',
      },
      {
        kind: 'p',
        text: 'I use this setup across several projects. The shape that repeats most is the one in the screenshots below: five Claude Code terminals for an application with the front end and back end in separate repositories.',
      },
      {
        kind: 'figure',
        src: '/articles/maestri/canvas.png',
        alt: 'Maestri canvas with five Claude Code terminals connected by dashed lines: QA, architect, front, back and automated tests.',
        caption: 'The team on the canvas. The architect is connected to both builders, the test agent and QA.',
      },

      { kind: 'h2', text: 'The team: five roles, none does everything' },
      {
        kind: 'list',
        items: [
          '**Architect**: reads the code on both sides, writes the plan and delegates. Never edits source code, not even when the task looks trivial.',
          '**Front-end builder** and **back-end builder**: each implements only its own slice, in its own repository, and only in the files the contract assigns to it.',
          '**Automated tests**: writes tests from the contract, without reading the code being written.',
          '**QA**: reviews both diffs against the contract, runs the suites and reports. Fixes nothing.',
        ],
      },
      {
        kind: 'p',
        text: 'This is the pattern Anthropic calls orchestrator-workers: a central model breaks the task down, delegates to others and synthesizes their results [5]. The difference is that here the orchestrator cannot touch the code. If it could, the shortcut would become the rule.',
      },
      {
        kind: 'figure',
        src: '/articles/maestri/papel-arquiteto.png',
        alt: 'Maestri terminal edit dialog, Agent tab, showing the Architect, Builder, Automated tests and QA roles, with Architect selected.',
        caption: 'Roles are saved in Maestri. On start, it copies the instructions into the project’s .maestri folder.',
      },
      {
        kind: 'p',
        text: 'Not every role needs the same model. On the test terminal I switched to Sonnet, which is cheaper. The architect and QA stay on Opus, because that is where a judgment error costs the most.',
      },

      { kind: 'h2', text: 'The contract is the source of truth' },
      {
        kind: 'p',
        text: 'Before any line of code, the architect writes a `CONTRATO.md` (contract) of at most 60 lines, always with the same nine sections:',
      },
      {
        kind: 'code',
        caption: 'Excerpt from the architect role, translated.',
        text: `1. Goal — one sentence.
2. Context — what exists today and what you verified in the code.
3. Acceptance criteria — verifiable by a command or a click.
4. Out of scope.
5. Slices — "front" and "back", each with its definition of done.
6. Shared interfaces — exact signature: route, method, field name,
   type, optionality, date format, error body, HTTP status.
7. File ownership — full path. Each file belongs to one slice only.
8. Risks.
9. Open questions — if there are any, stop and ask the user.`,
      },
      {
        kind: 'p',
        text: 'This follows what the Claude Code documentation recommends for larger features: a self-contained spec that names the files and interfaces involved, states what is out of scope and ends with a verification step [2]. Two sections carry more weight than the rest. **Shared interfaces** forces the exact format to be fixed before the builders start, so front and back never have to guess what the other side will send. **File ownership** prevents two agents from editing the same file at the same time.',
      },
      {
        kind: 'p',
        text: 'And there is a human gate: after writing the contract, the architect **stops and waits for my approval**. It cannot delegate in the same turn. It is the cheapest point to fix a misunderstanding, before five agents spend tokens on it.',
      },

      { kind: 'h2', text: 'Memory that does not depend on context' },
      {
        kind: 'p',
        text: 'Each terminal has its own context window, and it will be cleared or compacted at some point. That is why the team’s memory lives in files, outside the repositories: `CONTRATO.md` and a `LOG.md`. Every role starts with the same instruction: on start, read the contract and the latest log entries; when finishing any step, append one line; never delete old lines.',
      },
      {
        kind: 'code',
        caption: 'The first real line of LOG.md (kept in Portuguese): date, who, what was done, files touched and outcome.',
        text: '2026-09-21 17:56 | arquiteto | inicialização: maestri list (time: front, back,\ntestes automatizados, QA); CONTRATO.md e LOG.md não existiam | LOG.md criado |\nok, aguardando task',
      },
      {
        kind: 'p',
        text: 'You can see it working in the canvas screenshot. On start, both builders read the memory, noticed there was no contract yet and waited, instead of inventing a task.',
      },

      { kind: 'h2', text: 'Whoever builds is not whoever checks' },
      {
        kind: 'p',
        text: 'This is the part that prevents the most errors. A model grading its own text tends to favor it: a NeurIPS 2024 paper showed that LLMs recognize their own generations and score them higher, even when human annotators judge them equal [7]. The Claude Code documentation points the same way: a fresh context reviews better because it is not biased toward code it just wrote [2].',
      },
      { kind: 'p', text: 'That is why the team has two separations:' },
      {
        kind: 'list',
        items: [
          '**The test agent does not read the implementation.** It writes from the contract. If it needs to see the code to know what to test, the contract is incomplete, and it tells the architect. Each requirement gets the happy path plus at least two edge cases, and each test has to answer one question: what wrong behavior would make this test fail?',
          '**QA judges the code against the requirement, not against the implementer’s explanation.** It neither asks for nor accepts justifications. The search order is fixed: acceptance criteria, front/back mismatch (field by field, and always blocking), edge cases, silenced errors, breakage elsewhere in the system and files touched outside ownership.',
        ],
      },
      {
        kind: 'p',
        text: 'This is the loop Anthropic calls evaluator-optimizer: one model generates, another evaluates and sends feedback, in a loop [5]. With a cap: two rounds at most. If a new problem shows up in a third round, the problem is not in the code, it is in the contract, and the architect stops and talks to me.',
      },
      {
        kind: 'note',
        text: 'A caveat: a reviewer told to find gaps will almost always find some, even when the work is sound [2]. That is why QA rates every finding as blocking, important or minor, and I decide what goes in.',
      },

      { kind: 'h2', text: 'The errors this design tries to prevent' },
      {
        kind: 'list',
        items: [
          '**Front and back that do not match.** The interface is fixed in the contract, and the field-by-field comparison is the second item on QA’s list.',
          '**Two agents in the same file.** The ownership table gives every file one owner.',
          '**Tests that only confirm what the code already does.** Tests are written without seeing the implementation.',
          '**"Verified" without evidence.** Every role has a rule never to claim something it did not run. Whatever was not run goes into the report as "not verified".',
          '**Swallowed errors.** Empty catch blocks and errors that turn into success are on QA’s list.',
          '**Servers and ports in conflict.** Only the architect starts servers, in the background and logging to a file.',
          '**Fix loops.** The two-round cap sends the problem back to the plan.',
        ],
      },

      { kind: 'h2', text: 'Where the time savings come from' },
      {
        kind: 'p',
        text: 'Since I started working this way, I save a lot of time, and not because the model got faster. It comes down to these reasons:',
      },
      {
        kind: 'list',
        items: [
          '**Parallel work.** Front end, back end and tests move at the same time, each in its own terminal, instead of one agent doing everything in sequence.',
          '**Small, focused context.** Each agent carries only its slice and the contract, not the whole project conversation. With less in the window, the model is less likely to get lost or hallucinate, unlike a single session that keeps filling up [2][3].',
          '**Less rework.** Since the interface is agreed on first, front end and back end do not have to be redone later to fit together.',
          '**Errors caught before they reach me.** Tests and QA run before my review. By the time I read the diff, most of the problems have already been fixed.',
          '**No re-explaining.** File-based memory lets any terminal pick up where it left off after its context is cleared, without me repeating what was already decided.',
        ],
      },

      { kind: 'h2', text: 'What is still mine' },
      {
        kind: 'p',
        text: 'I approve the contract before any delegation. I read the diff line by line before committing, the same double layer of review I describe on the [AI page](/ai). No agent pushes.',
      },
      {
        kind: 'p',
        text: 'And I watch what no role covers well: dependencies. A study presented at USENIX Security 2025 found that, on average, at least 5.2% of the packages in code generated by commercial models did not exist, and 21.7% for open models [8]. When a new package shows up in the diff, I check it by hand.',
      },

      { kind: 'h2', text: 'Costs and limits' },
      {
        kind: 'p',
        text: 'Orchestrating agents is not free. Anthropic measured that agents use about 4 times more tokens than chat, and multi-agent systems about 15 times [6]. In the same post, it notes that most coding tasks have less truly parallel work than research [6]. I agree, which is why I only split into front and back: once the interface is fixed, the two sides really are independent.',
      },
      {
        kind: 'p',
        text: 'For a small task, the whole team is overkill. Anthropic recommends starting with the simplest solution and adding complexity only when needed [5], and my architect has that rule written down: if the task is trivial, it tells me it is a job for a single agent. Sometimes it is still faster to write it myself.',
      },

      { kind: 'h2', text: 'Conclusion' },
      {
        kind: 'p',
        text: 'The gain does not come from a better model. It comes from treating agents as a team: roles that do not overlap, a contract written before the code, memory kept in files, and review done by someone who did not write it. What goes to production is still my responsibility.',
      },
    ],
  },
}
