import { SystemQueries } from "ecsy";
import { toolLookup } from "interaction/utility/toolLookup";
import { ExtraSystem } from "../../ecsy-extra/index";
import { EquipToolEvent, EquipToolInstanceEvent } from "../components";
// import { CurrentTool } from "../components/CurrentTool";
import { ToolEquipper } from "../components/tools/ToolEquipper";

export class ToolEquipSystem extends ExtraSystem {
    execute() {
        this.queries.readyAbstract.added!.forEach(entity => {
            const equipper = entity.getMutableComponent(ToolEquipper)!
            const equipEvent = entity.getComponent(EquipToolEvent)!
            entity.removeComponent(toolLookup[equipper.currentTool])

            const NewToolType = toolLookup[equipEvent.toolType]
            entity.addComponent(NewToolType, equipEvent.toolParams)
            equipper.currentTool = equipEvent.toolType

            entity.removeComponent(EquipToolEvent)
        })

        this.queries.readyInstance.added!.forEach(entity => {
            const equipper = entity.getMutableComponent(ToolEquipper)!
            const equipEvent = entity.getComponent(EquipToolInstanceEvent)!
            entity.removeComponent(toolLookup[equipper.currentTool])

            const NewToolType = toolLookup[equipEvent.toolType]
            const tool = equipEvent.toolEntity.getComponent(NewToolType)?.clone() as any

            entity.addComponent(NewToolType, tool)
            equipper.currentTool = equipEvent.toolType

            entity.removeComponent(EquipToolInstanceEvent)
        })

    }

    static queries: SystemQueries = {
        readyAbstract: {
            components: [ToolEquipper, EquipToolEvent],
            listen: {
                added: true
            }
        },
        readyInstance: {
            components: [ToolEquipper, EquipToolInstanceEvent],
            listen: {
                added: true
            }
        }
    }
}