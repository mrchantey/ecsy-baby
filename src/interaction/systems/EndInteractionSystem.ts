



import { Not, SystemQueries } from "ecsy";
import { ExtraSystem } from "ecsy-extra";
import { HoverEvent, InteractionEvent, MoveItemEvent, RaycastInteractionEvent, SelectEvent } from "interaction/components";

export class EndInteractionSystem extends ExtraSystem {
    execute() {
        this.queries.entities.results
            .forEach(entity => {
                entity.removeComponent(InteractionEvent)
            })
    }

    static queries: SystemQueries = {
        entities: {
            components: [
                InteractionEvent,
                Not(RaycastInteractionEvent),
                Not(HoverEvent),
                Not(SelectEvent),
                Not(MoveItemEvent)
            ]
        }
    }
}