

import { Application, Assets, Container, Sprite, Ticker } from 'pixi.js';
import { AxisHelper } from '../engine/utils/axisHelper';
import { CameraController } from '../engine/camera/cameraController';
import { UnitConverter } from '../engine/utils/unitConverter';
import { BoxEntity } from '../game/boxEntity';
import { RigidBody2D } from '../engine/physics/rigidBody2d';
import { BoxView } from '../views/boxView';
import { PhysicsWorld } from '../engine/physics/physicsWorld';

type GameInitData = {
    app: Application,
};

export class Game {

    private static instance: Game;
    private initialized!: boolean;

    private app!: Application;
    private unitConverter!: UnitConverter;
    private physicsWorld!: PhysicsWorld;

    //---Controllers
    private cameraController!: CameraController;

    //---Views
    private worldContainer!: Container;
    private bunny!: Sprite;
    private helper!: AxisHelper;
    private boxes: BoxEntity[] = [];

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

        this.unitConverter = new UnitConverter(100); // 1 meter = 100 pixels

        this.physicsWorld = new PhysicsWorld();
        this.createWorld();

        this.cameraController = new CameraController(
            this.app.canvas,
            this.worldContainer
        );


        this.app.ticker.add(this.update, this);
    }

    private createWorld(): void {

        this.createTestBunny();
        this.createAxisHelper();


        this.worldContainer = new Container();
        this.worldContainer.addChild(this.bunny);
        this.worldContainer.addChild(this.helper);
        this.app.stage.addChild(this.worldContainer);

        let tempOffsetX = 2;
        this.createBox(tempOffsetX + 0, 0);
        // this.createBox(tempOffsetX + 2, 0);
        // this.createBox(tempOffsetX + 4, 0);
        // this.createBox(tempOffsetX + 6, 0);
        // this.createBox(tempOffsetX + 8, 0);
    }
    private createTestBunny(): void {

        const texture = Assets.get("bunnyTexture");
        this.bunny = new Sprite(texture);
        this.bunny.anchor.set(0.5);
        this.bunny.position.set(
            this.app.screen.width / 2,
            this.app.screen.height / 2
        );

        this.app.stage.addChild(this.bunny);
    }
    private createAxisHelper(): void {
        const helper = new AxisHelper({
            length: 200,
            flipY: false,
        });
        this.helper = helper;
        this.app.stage.addChild(helper);
        helper.position.set(50, 100);
    }

    private createBox(xMeters: number, yMeters: number): void {
        const body = new RigidBody2D({
            x: xMeters,
            y: yMeters,
            mass: 1,
        });

        console.log('xxx this.unitConverter', this.unitConverter);

        const view = new BoxView(
            1, // width in meters
            1, // height in meters
            this.unitConverter
        );

        const box = new BoxEntity(body, view);

        this.physicsWorld.addBody(box.body);
        this.worldContainer.addChild(box.view.graphics);

        this.boxes.push(box);
    }

    private update(ticker: Ticker): void {
        this.bunny.rotation += 0.1 * ticker.deltaTime;

        const dt = ticker.deltaMS / 1000;
        this.physicsWorld.step(dt);

        for (const box of this.boxes) {
            box.updateView();
        }
    }
}
