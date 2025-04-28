import { getAppUrl } from "@/lib/helper/url";
import prisma from "@/lib/prisma";
import { WorkflowStatus } from "@/types/workflow";
import { executeWorkflow } from "@/actions/workflow";

export async function GET(req: Request) {
    const now = new Date();
    const workflows = await prisma.workflow.findMany({
        select: { id: true },
        where: {
            status: WorkflowStatus.PUBLISHED,
            cron: { not: null },
            nextRunAt: { lte: now },
        }
    });

    const results = await Promise.allSettled(
        workflows.map(workflow => executeWorkflow(workflow.id))
    );

    const successfulExecutions = results.filter(
        result => result.status === 'fulfilled'
    ).length;

    return Response.json({
        totalWorkflows: workflows.length,
        successfulExecutions,
        failedExecutions: workflows.length - successfulExecutions
    }, { status: 200 });
}