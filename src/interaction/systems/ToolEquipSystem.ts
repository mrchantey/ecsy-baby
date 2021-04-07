import { Entity, SystemQueries } from "ecsy";
import { ExtraSystem } from "../../ecsy-extra/index";
import { EquipToolEvent } from "../components";
// import { CurrentTool } from "../components/CurrentTool";
import { ToolEquipper } from "../components/ToolEquipper";
import { toolComponentLookup } from "../utility/toolLookup";
import { iToolType } from "../utility/tools";

export class ToolEquipSystem extends ExtraSystem {
    execute() {
        this.queries.equippers.added!.forEach(entity => {
            const equipper = entity.getMutableComponent(ToolEquipper)!
            const equipEvent = entity.getComponent(EquipToolEvent)!
            entity.removeComponent(toolComponentLookup[equipper.currentTool])

            const ToEquipType = toolComponentLookup[equipEvent.toolType]
            const tool = equipEvent.toolEntity.getComponent(ToEquipType)!

            entity.addComponent(ToEquipType, tool)
            // console.log('equipping!');
            // console.dir(componentCopy);
            // entity.addComponent(toolComponentLookup[equipEvent.tool.toolType], componentCopy)

            entity.removeComponent(EquipToolEvent)
        })
        // const currentTool = this.getSingletonComponent(CurrentTool)?.tool
        // this.queries.toolEquippers.results
        //     .filter(equipper => equipper.getComponent(toolComponentLookup[currentTool]) === undefined)
        //     .forEach((entity, index) => this.equipNewTool(entity, currentTool))
    }



    // equipNewTool(equipper: Entity, newTool: Tool) {
    //     const toolEquipper = equipper.getMutableComponent(ToolEquipper)!
    //     equipper.removeComponent(toolComponentLookup[toolEquipper.currentTool])
    //     equipper.addComponent(toolComponentLookup[newTool])
    //     toolEquipper.currentTool = newTool
    // }

    static queries: SystemQueries = {
        equippers: {
            components: [ToolEquipper, EquipToolEvent],
            listen: {
                added: true
            }
        }
    }
}