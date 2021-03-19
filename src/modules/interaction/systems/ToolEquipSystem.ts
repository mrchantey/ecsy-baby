import { Entity, SystemQueries } from "ecsy";
import { BabySystem } from "../../../types/system";
import { isEmpty } from "../../../utility/jsUtility";
import { CurrentTool } from "../components/CurrentTool";
import { ToolEquipper } from "../components/ToolEquipper";
import { Tool, toolComponentLookup } from "../utility/tools";

export class ToolEquipSystem extends BabySystem {
    execute() {
        const currentTool = this.getSingletonComponent(CurrentTool)?.tool
        this.queries.toolEquippers.results
            .filter(equipper => equipper.getComponent(toolComponentLookup[currentTool]) === undefined)
            .forEach((entity, index) => this.equipNewTool(entity, currentTool))
    }



    equipNewTool(equipper: Entity, newTool: Tool) {
        const toolEquipper = equipper.getMutableComponent(ToolEquipper)!
        equipper.removeComponent(toolComponentLookup[toolEquipper.currentTool])
        equipper.addComponent(toolComponentLookup[newTool])
        toolEquipper.currentTool = newTool
    }

    static queries: SystemQueries = {
        toolEquippers: {
            components: [ToolEquipper]
        }
    }
}