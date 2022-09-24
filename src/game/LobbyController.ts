import GameController from './GameController';
import GameInterface from './GameInterface';
import Wallet from '../objects/wallet/Wallet';
import ActorController from '../client/controller/ActorController';

export default class LobbyController {
    actors: Wallet[] = [];
    clients: ActorController[] = [];
    canBuild: (lobby: LobbyController) => number;
    build: (actors: Wallet[]) => GameInterface;

    constructor(canBuild: (lobby: LobbyController) => number, build: (actors: Wallet[]) => GameInterface) {
        this.canBuild = canBuild;
        this.build = build;
    }

    // This class could be a P2P controller if it also kept track of the other queue.
    // Should probably create a P2PController which manages a collection of players and will attempt to create a game once there's enough
    // players ready.
    // There may be issues on who creates a game if the P2PController is created by default, but we could make it a ServerController to handle that.
    tryCreateNewGame(): GameController | undefined {
        const playersRequired = this.canBuild(this);
        if (playersRequired > 0) {
            const clients: ActorController[] = []; 
            const actors: Wallet[] = [];
            for (let i = 0; i < playersRequired; ++i) {
                /// TODO dont shift but update the controller.
                const client = this.clients.shift();
                const actor = client?.getActor();
                if (client && actor) {
                    actors.push(actor);
                    clients.push(client);
                }
            }

            const gameController = this.createNewGame(actors);
            // todo move emit to createNewGame
            if (gameController) {
                clients.reduce(async (promise: Promise<void>, client: ActorController) => {
                    await promise;
                    await client.onGameReady(gameController);
                }, Promise.resolve())
            }
            return gameController;
        }
        return;
    }

    createNewGame(actors: Wallet[]): GameController | undefined {
        const gameController = new GameController(this.build(actors));
        gameController.initialize();
        return gameController;
    }

    addClient(actorController: ActorController) {
        this.clients.push(actorController);
        this.tryCreateNewGame();
    }
}
