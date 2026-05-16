import { LineSegment2d } from "../physics/bodies/lineSegment2d";

import { LineView } from "../views/lineView";

export class LineEntity {
  public readonly body: LineSegment2d;
  public readonly view: LineView;

  constructor(body: LineSegment2d, view: LineView) {
    this.body = body;
    this.view = view;
  }

  public updateView(): void {
    this.view.syncFrom(this.body);
  }
}