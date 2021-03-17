import { SystemQueries } from "ecsy";
import { BabySystem } from "../../../types/system";
import { isEmpty } from "../../../utility/jsUtility";
import { CurrentTool } from "../components/CurrentTool";
import { ToolEquipper } from "../components/ToolEquipper";
import { toolComponentLookup } from "../utility/tools";

export class ToolEquipSystem extends BabySystem {
    execute() {
        const currentTool = this.getSingletonComponent(CurrentTool)?.tool
        if (isEmpty(currentTool))
            return


        this.queries.toolEquippers.results
            .forEach((entity, index) => {

                const supposedCurrentTool = entity.getComponent(toolComponentLookup[currentTool])
                if (isEmpty(supposedCurrentTool)) {
                    toolComponentLookup
                        .filter((val, i) => i !== currentTool)
                        .forEach((val, index) => entity.removeComponent(val))
                    entity.addComponent(toolComponentLookup[currentTool])
                }


                // const x =                 

                // const moveItemTool 
            })
    }

    static queries: SystemQueries = {
        toolEquippers: {
            components: [ToolEquipper]
        }
    }
}