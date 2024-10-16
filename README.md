# Gestão UI

## Acesse
- http://localhost:8080

Ui para consumir a api de registro de tarefas e horas trabalhadas

## Sobre o sistema
- Usuários: podem ser vinculados como responsável nas tarefas.
- Tarefas: tem a ideia de uma solicitação, para ser executada.
- Atividades: Tem o objetivo de registrar as horas trabalhadas de cada usuário em cima de uma tarefa.

## Requisitos
- node 18.20.2
- npm 10.5.0
- Docker 24.0.7
- Docker Compose 2.29.4

## Uso
```bash
# Instalar as dependêcias
npm install

# Iniciar ui
npm run serve

# Compilar ui
npm run build
```

## Uso via Docker
```bash
# Iniciar ui
docker compose up
```

## Telas

Crud de Usuários
![Crud de Usuários](docs/telas/usuarios.png)

Crud de Tarefas
![Crud de Tarefas](docs/telas/tarefas.png)

Crud de Atividades
![Crud de Atividades](docs/telas/atividades.png)

Menu Lateral
![Menu Lateral](docs/telas/menu_lateral.png)
