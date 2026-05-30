import { LineSegment2D } from "../physics/bodies/lineSegment2D";

import { LineView } from "../views/lineView";

export class LineEntity {
  public readonly body: LineSegment2D;
  public readonly view: LineView;

  constructor(body: LineSegment2D, view: LineView) {
    this.body = body;
    this.view = view;
  }

  public updateView(): void {
    this.view.syncFrom(this.body);
  }
}