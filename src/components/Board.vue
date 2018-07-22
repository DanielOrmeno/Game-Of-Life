<script lang="ts">
import Vue from 'vue';
import { Tile } from '../classes/tile';
import TileComponent from './Tile.vue';
import { GridPosition } from '../classes/gridPosition';

const gridSize = 40;
const grid: Tile[][] = [];

export default Vue.extend({
    components: { Tile: TileComponent },
    data: () => ({
        gridSize,
        grid,
        interval: undefined,
        cycles: 0,
    }),
    mounted() {
        this.grid = this.duplicateTiles();
        this.randomize();
    },
    methods: {
        traverse(g: any, callback: any) {
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < g.length; i++) {
                for (let j = 0; j < g.length; j++) {
                    callback(g[i][j]);
                }
            }
        },
        randomize() {
            this.traverse(this.grid, (tile: Tile) => {
                tile.alive = Math.random() >= 0.5;
            });
        },
        clear() {
            this.traverse(this.grid , (t: Tile) => t.alive = false);
            this.cycles = 0;
        },
        count(alive: boolean) {
            let count = 0;
            this.traverse(this.grid, (tile: Tile) => {
                if (tile.alive === alive) { count++; }
            });

            return count;
        },
        countNeighbors(tile: Tile, g: any) {
            const p = tile.position;
            const n = this.gridSize - 1;
            const i = tile.x;
            const j = tile.y;
            let count = 0;

            if (p === GridPosition.TopLeftCorner) {
                if (g[0][1].isAlive) { count++; }
                if (g[0][n].isAlive) { count++; }
                if (g[1][0].isAlive) { count++; }
                if (g[1][1].isAlive) { count++; }
                if (g[1][n].isAlive) { count++; }
                if (g[n][0].isAlive) { count++; }
                if (g[n][1].isAlive) { count++; }
                if (g[n][n].isAlive) { count++; }
            } else if (p === GridPosition.TopRightCorner) {
                if (g[0][0].isAlive) { count++; }
                if (g[0][n - 1].isAlive) { count++; }
                if (g[1][0].isAlive) { count++; }
                if (g[1][n - 1].isAlive) { count++; }
                if (g[1][n].isAlive) { count++; }
                if (g[n][0].isAlive) { count++; }
                if (g[n][n - 1].isAlive) { count++; }
                if (g[n][n].isAlive) { count++; }
            } else if (p === GridPosition.BottomLeftCorner) {
                if (g[0][0].isAlive) { count++; }
                if (g[0][1].isAlive) { count++; }
                if (g[0][n].isAlive) { count++; }
                if (g[n - 1][0].isAlive) { count++; }
                if (g[n - 1][1].isAlive) { count++; }
                if (g[n - 1][n].isAlive) { count++; }
                if (g[n][1].isAlive) { count++; }
                if (g[n][n].isAlive) { count++; }
            } else if (p === GridPosition.BottomRightCorner) {
                if (g[0][0].isAlive) { count++; }
                if (g[0][n - 1].isAlive) { count++; }
                if (g[0][n].isAlive) { count++; }
                if (g[n - 1][0].isAlive) { count++; }
                if (g[n - 1][n - 1].isAlive) { count++; }
                if (g[n - 1][n].isAlive) { count++; }
                if (g[n][0].isAlive) { count++; }
                if (g[n][n - 1].isAlive) { count++; }
            } else if (p === GridPosition.TopEdge) {
                if (g[i][j - 1].isAlive) { count++; }
                if (g[i][j + 1].isAlive) { count++; }
                if (g[i + 1][j - 1].isAlive) { count++; }
                if (g[i + 1][j].isAlive) { count++; }
                if (g[i + 1][j + 1].isAlive) { count++; }
                if (g[n][j - 1].isAlive) { count++; }
                if (g[n][j].isAlive) { count++; }
                if (g[n][j + 1].isAlive) { count++; }
            } else if (p === GridPosition.RightEdge) {
                if (g[i - 1][0].isAlive) { count++; }
                if (g[i - 1][j - 1].isAlive) { count++; }
                if (g[i - 1][j].isAlive) { count++; }
                if (g[i][0].isAlive) { count++; }
                if (g[i][j - 1].isAlive) { count++; }
                if (g[i + 1][0].isAlive) { count++; }
                if (g[i + 1][j - 1].isAlive) { count++; }
                if (g[i + 1][j].isAlive) { count++; }
            } else if (p === GridPosition.LeftEdge) {
                if (g[i - 1][j].isAlive) { count++; }
                if (g[i - 1][j + 1].isAlive) { count++; }
                if (g[i - 1][n].isAlive) { count++; }
                if (g[i][j + 1].isAlive) { count++; }
                if (g[i][n].isAlive) { count++; }
                if (g[i + 1][j].isAlive) { count++; }
                if (g[i + 1][j + 1].isAlive) { count++; }
                if (g[i + 1][n].isAlive) { count++; }
            } else if (p === GridPosition.BottomEdge) {
                if (g[0][j - 1].isAlive) { count++; }
                if (g[0][j].isAlive) { count++; }
                if (g[0][j + 1].isAlive) { count++; }
                if (g[i - 1][j - 1].isAlive) { count++; }
                if (g[i - 1][j].isAlive) { count++; }
                if (g[i - 1][j + 1].isAlive) { count++; }
                if (g[i][j - 1].isAlive) { count++; }
                if (g[i][j + 1].isAlive) { count++; }
            } else if (p === GridPosition.Inner) {
                if (g[i - 1][j - 1].isAlive) { count++; }
                if (g[i - 1][j].isAlive) { count++; }
                if (g[i - 1][j + 1].isAlive) { count++; }
                if (g[i][j - 1].isAlive) { count++; }
                if (g[i][j + 1].isAlive) { count++; }
                if (g[i + 1][j - 1].isAlive) { count++; }
                if (g[i + 1][j].isAlive) { count++; }
                if (g[i + 1][j + 1].isAlive) { count++; }
            } else {
                throw new Error('Something is wrong =(');
            }

            return count;
        },
        setState() {
            const tmp = this.duplicateTiles(this.grid);
            this.traverse(this.grid, (t: Tile) => {
                const c = this.countNeighbors(t, this.grid);
                const i = t.x;
                const j = t.y;
                if (t.alive) {
                if (c < 2 || c > 3) {
                    tmp[i][j].alive = false;
                }
                } else if (!t.alive && c === 3) {
                    tmp[i][j].alive = true;
                }
            });
            this.grid = tmp;
        },
        duplicateTiles(tiles?: Tile[][]): Tile[][] {
            const r: any[] = [];
            for (let i = 0; i < this.gridSize; i++) {
                r[i] = [];
                for (let j = 0; j < this.gridSize; j++) {
                    const t = new Tile(i, j, this.gridSize);
                    r[i][j] = tiles ? Object.assign(t, tiles[i][j]) : t;
                }
            }
            return r;
        },
        start() {
            this.interval = (setInterval(() => {
                this.cycles += 1;
                this.setState();
            }, 100)) as any;
        },
        stop() {
            clearInterval(this.interval);
            this.interval = undefined;
        },
    },
    computed: {
        aliveCount(): number {
            return this.count(true);
        },
        deadCount(): number {
            return this.count(false);
        },
        running(): boolean {
            return this.interval !== undefined;
        },
    },
});
</script>

<template>
<div>
    <div class="container mt-5" v-if="grid.length > 0">
        <div class="row">
            <div class="col">
                <span class="badge">{{cycles}} Cycles</span>
                <span class="badge badge-success">{{aliveCount}} Alive</span>
                <span class="badge badge-danger">{{deadCount}} Dead</span>
            </div>
            <div class="col text-right">
                <button type="button" class="btn btn-sm" @click="start" :disabled="running || aliveCount === 0">Start</button>
                <button type="button" class="btn btn-sm" @click="stop" :disabled="!running" >Stop</button>
                <button type="button" class="btn btn-sm" @click="randomize" :disabled="running">Random</button>
                <button type="button" class="btn btn-sm" @click="clear" :disabled="running || aliveCount === 0">Clear</button>
            </div>
        </div>
        <div class="board card mt-3">
            <div v-for="(r, i) in grid" class="grid-row" :key="i">
                <Tile v-for="(tile, j) in r"
                            :key="j"
                            :alive.sync="tile.alive"></Tile>
            </div>
        </div>
  </div>
</div>
</template>

<style lang="less" scoped>
.board {
  margin-left: auto;
  margin-right: auto;
  width: fit-content;
  padding: 1em;
}
.grid-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
