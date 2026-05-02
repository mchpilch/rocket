

import { Application, Assets, Container, Sprite, Ticker } from 'pixi.js';
import { AxisHelper } from '../engine/utils/axisHelper';
import { CameraController } from '../engine/camera/cameraController';

type GameInitData = {
    app: Application,
};

export class Game {

    private static instance: Game;
    private initialized!: boolean;

    private app!: Application;

    //---Controllers
    private cameraController!: CameraController;

    //---Views
    private worldContainer!: Container;
    private bunny!: Sprite;
    private helper!: AxisHelper;

    private constructor() {
        this.initialized = false;
    }

    public static getInstance(): Game {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    }

    async init(gameInitData: GameInitData) { // gameInitData: GameInitData

        // ensuring init will be called once
        if (this.initialized) {
            console.warn('Game is already initialized. Ignoring duplicate init call.');
            return;
        }
        this.initialized = true;


        // setup managers
        this.app = gameInitData.app;

        this.app.stage.interactive = true;

        await this.createWorld();

        this.cameraController = new CameraController(
            this.app.canvas,
            this.worldContainer
        );

        this.app.ticker.add(this.update, this);
    }

    private async createWorld(): Promise<void> {

        await this.createTestBunny();
        await this.createAxisHelper();


        this.worldContainer = new Container();
        this.worldContainer.addChild(this.bunny);
        this.worldContainer.addChild(this.helper);
        this.app.stage.addChild(this.worldContainer);
    }
    private async createTestBunny(): Promise<void> {
        const texture = await Assets.load("/assets/bunny.png");

        this.bunny = new Sprite(texture);
        this.bunny.anchor.set(0.5);
        this.bunny.position.set(
            this.app.screen.width / 2,
            this.app.screen.height / 2
        );

        this.app.stage.addChild(this.bunny);
    }

    private async createAxisHelper(): Promise<void> {

        const helper = new AxisHelper({
            length: 200,
            flipY: false,
        });
        this.helper = helper;
        this.app.stage.addChild(helper);
        helper.position.set(50, 100);
    }

    private update(ticker: Ticker): void {
        this.bunny.rotation += 0.1 * ticker.deltaTime;
    }
}
