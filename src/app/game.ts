

import { Application, Assets, Container, Sprite, Ticker } from 'pixi.js';
import { AxisHelper } from '../engine/utils/axisHelper';
import { CameraController } from '../engine/camera/cameraController';
import { UnitConverter } from '../engine/utils/unitConverter';
import { BoxEntity } from '../engine/entities/boxEntity';
import { RigidBody2D } from '../engine/physics/bodies/rigidBody2d';
import { PhysicsWorld } from '../engine/physics/physicsWorld';
import { LineEntity } from '../engine/entities/lineEntity';
import { LineSegment2d } from '../engine/physics/bodies/lineSegment2d';
import { LineView } from '../engine/views/lineView';
import { BoxView } from '../engine/views/boxView';
import { CircleView } from '../engine/views/circleView';
import { CircleEntity } from '../engine/entities/circleEntity';
import { PolygonEntity } from '../engine/entities/polygonEntity';
import { PolygonView } from '../engine/views/polygonView';

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
    // private bunny!: Sprite;
    private helper!: AxisHelper;
    private boxes: BoxEntity[] = [];
    private lines: LineEntity[] = [];
    private circles: CircleEntity[] = [];
    private polygons: PolygonEntity[] = [];

    private isCKeyPressed: boolean = false; // customise more later to add creating of circles, boxes, polygons with n angles etc.
    private is3KeyPressed: boolean = false; // todo
    private is4KeyPressed: boolean = false; // todo
    private is5KeyPressed: boolean = false; // todo
    private is6KeyPressed: boolean = false; // todo
    private is7KeyPressed: boolean = false; // todo
    private is8KeyPressed: boolean = false; // todo

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

        this.app.stage.eventMode = "static";
        this.app.stage.hitArea = this.app.screen;

        this.app.stage.on("pointerdown", (e) => {
            // console.log('Pointer down at:', e.global);
            if (e.button === 0 && this.isCKeyPressed) { // leftCLick
                // console.log('Pointer down at2:', e.global);
                const xM = this.unitConverter.pixelsToMeters(e.global.x);
                const yM = this.unitConverter.pixelsToMeters(e.global.y);
                this.createBox(xM, yM);
            }
        });

        // Track if the "c" key is currently being held down
        this.isCKeyPressed = false;

        window.addEventListener('keydown', (e) => {
            if (e.key === 'c' || e.key === 'C') {
                this.isCKeyPressed = true;
                console.log('C key pressed');
            }
        });

        window.addEventListener('keyup', (e) => {
            if (e.key === 'c' || e.key === 'C') {
                this.isCKeyPressed = false;
                console.log('C key released');
            }
        });


        this.app.ticker.add(this.update, this);
    }

    private createWorld(): void {

        // this.createTestBunny();
        this.createAxisHelper();

        this.worldContainer = new Container();
        // this.worldContainer.addChild(this.bunny);
        this.worldContainer.addChild(this.helper);
        this.app.stage.addChild(this.worldContainer);

        let tempOffsetX = 2;
        this.createBox(tempOffsetX + 0, 0);
        this.createCircle(tempOffsetX + 2, 0);

        this.createPolygon(tempOffsetX + 3, 0, 5); // Create a pentagon
        this.createPolygon(tempOffsetX + 4, 0, 6); // Create a hexagon
        this.createPolygon(tempOffsetX + 5, 0, 7); // Create a septagon
        this.createPolygon(tempOffsetX + 6, 0, 8); // Create a octagon 
        this.createFloor();
    }
    // private createTestBunny(): void {

    //     const texture = Assets.get("bunnyTexture");
    //     this.bunny = new Sprite(texture);
    //     this.bunny.anchor.set(0.5);
    //     this.bunny.position.set(
    //         this.app.screen.width / 2,
    //         this.app.screen.height / 2
    //     );

    //     this.app.stage.addChild(this.bunny);
    // }
    private createAxisHelper(): void {
        const helper = new AxisHelper({
            lengthMeters: 6,
            flipY: false,
        });
        this.helper = helper;
        this.app.stage.addChild(helper);
        helper.position.set(0, 0);
    }

    private createBox(xMeters: number, yMeters: number): void {
        const body = new RigidBody2D({
            x: xMeters,
            y: yMeters,
            mass: 1,
        });

        // console.log('xxx this.unitConverter', this.unitConverter);

        const view = new BoxView(
            1, // width in meters
            1, // height in meters
            this.unitConverter
        );

        const box = new BoxEntity(body, view);

        this.physicsWorld.addBody(box.body);
        this.worldContainer.addChild(box.view.graphics);

        this.boxes.push(box);
        console.log('xxx box created at', xMeters, yMeters);
    }

    private createCircle(xMeters: number, yMeters: number, radiusMeters: number = 0.5): void {
        const body = new RigidBody2D({
            x: xMeters,
            y: yMeters,
            mass: 1,
        });

        const view = new CircleView(
            radiusMeters, // radius in meters
            this.unitConverter
        );

        const circle = new CircleEntity(body, view);

        this.physicsWorld.addBody(circle.body);
        this.worldContainer.addChild(circle.view.graphics);

        this.circles.push(circle);
    }
    private createPolygon(
        xMeters: number,
        yMeters: number,
        numberOfSides: number,
        radiusMeters: number = 0.5
    ): void {
        const body = new RigidBody2D({
            x: xMeters,
            y: yMeters,
            mass: 1,
        });

        const view = new PolygonView(
            numberOfSides, // number of sides
            radiusMeters, // radius in meters
            this.unitConverter
        );

        const polygon = new PolygonEntity(body, view);

        this.physicsWorld.addBody(polygon.body);
        this.worldContainer.addChild(polygon.view.graphics);

        this.polygons.push(polygon);
    }

    private createFloor(): void {

        const line = new LineSegment2d({
            x1: -5, y1: 5,
            x2: 10, y2: 5,
        });

        const view = new LineView(this.unitConverter, 0x00ff00, 1);

        const floor = new LineEntity(line, view);
        floor.updateView();

        this.worldContainer.addChild(floor.view.graphics);
        this.lines.push(floor);
    }

    private update(ticker: Ticker): void {
        // this.bunny.rotation += 0.1 * ticker.deltaTime;

        const dt = ticker.deltaMS / 1000;
        this.physicsWorld.step(dt);

        for (const box of this.boxes) {
            box.updateView();
            box.resolveTemporaryFloorCollision(); // [TEMP]
        }
        for (const circle of this.circles) {
            circle.updateView();
            circle.resolveTemporaryFloorCollision(); // [TEMP]
        }
        for (const polygon of this.polygons) {
            polygon.updateView();
            polygon.resolveTemporaryFloorCollision(); // [TEMP]
        }
    }
}
