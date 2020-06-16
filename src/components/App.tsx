import * as PIXI from "pixi.js";
import * as React from "react";
import { Config } from '../Config';
import { Browser } from "../core/Browser";
import { Game } from '../Game';

export interface AppProps { compiler: string; framework: string; }

export interface AppState {  }

export class App extends React.Component<AppProps, AppState> {
    pixiElement: HTMLDivElement;
    app: PIXI.Application;
    game: Game;

    getConfig() {
        const config = new Config();
        config.size = Browser.getQueryNumber("size", 100);
        config.debug = Browser.getQueryBoolean("debug", false);
        return config;
    }
    
    pixiUpdate = (element: HTMLDivElement) => {
        this.pixiElement = element;
        
        if (this.pixiElement && this.pixiElement.children.length <= 0) {
            const config = this.getConfig();
            this.app = new PIXI.Application({width: window.innerWidth, height: window.innerHeight, backgroundColor: config.backgroundColor });
            this.pixiElement.appendChild(this.app.view);
            this.game = new Game(config, this.app);
            this.game.init();
        }
    }

    render() {
        return (<div>
            <div ref={this.pixiUpdate} />
        </div>
        );
    }
}