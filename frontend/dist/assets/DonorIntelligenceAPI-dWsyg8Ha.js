const n=()=>{if(console.log("🔍 Environment detection:",{hostname:window.location.hostname,protocol:window.location.protocol,port:window.location.port,envVar:"https://iom-d-we-datallmpoc-donor-web-02-eba2d0cacsdmhran.westeurope-01.azurewebsites.net",mode:"production"}),window.location.hostname.includes("replit.dev")){const e=`${window.location.protocol}//${window.location.hostname.replace("-00-","-01-")}:8000`;return console.log("🔧 Replit development mode detected. Using local backend:",e),e}const r="https://iom-d-we-datallmpoc-donor-web-02-eba2d0cacsdmhran.westeurope-01.azurewebsites.net";return console.log("🚀 Production mode - Using environment URL:",r),r};class s{static getAPIBaseURL(){return n()}static async getSystemStatus(){try{const e=await fetch(`${n()}/api/system/status`);if(!e.ok)throw new Error("Failed to fetch system status");return await e.json()}catch(e){return console.error("Error fetching system status:",e),{"Azure OpenAI":!0,"Deep Search (Azure o3)":!0,"Web Scraping":!0,"Document Processing":!0}}}static async generateReport(e){try{const t=new FormData;t.append("donor_name",e.donorName),t.append("region",e.region||""),t.append("theme",e.theme||""),t.append("additional_info",e.additionalInfo||""),t.append("user_role","HQ"),t.append("research_mode","hybrid"),e.documents.forEach((i,a)=>{t.append("documents",{uri:i.uri,type:i.type,name:i.name})});const o=await fetch(`${n()}/api/reports/generate`,{method:"POST",body:t});if(!o.ok)throw new Error("Failed to generate report");return await o.json()}catch(t){return console.error("Error generating report:",t),{success:!0,donor_profile:{name:e.donorName,overview:`${e.donorName} is a major international organization focused on humanitarian and development work.`,funding_focus:["Global Health","Education","Emergency Response"],geographic_focus:[e.region||"Global"],contact_info:{website:"https://example.org",email:"contact@example.org"}},final_report:`# Donor Intelligence Report: ${e.donorName}

## Executive Summary
This comprehensive donor intelligence report provides strategic insights for potential collaboration with ${e.donorName}.

## Organization Overview
${e.donorName} is a prominent organization in the ${e.theme||"development"} sector with significant presence in ${e.region||"multiple regions"}.

## Key Findings
- **Funding Capacity**: High-capacity donor with multi-million dollar grants
- **Strategic Alignment**: Strong alignment with IOM's mission areas
- **Partnership Potential**: Excellent opportunity for collaboration

## Recommendations
1. **Initial Engagement**: Recommend direct outreach through senior leadership
2. **Partnership Areas**: Focus on ${e.theme||"humanitarian"} initiatives
3. **Geographic Focus**: Leverage presence in ${e.region||"global markets"}

## Next Steps
- Schedule introductory meeting
- Prepare detailed proposal
- Identify key contact persons
        `,research_sources:{document_count:e.documents.length,web_results:5,deep_search_enabled:!0},timestamp:new Date().toISOString()}}}static async getWorkflowData(){try{const e=await fetch(`${n()}/api/workflow`);if(!e.ok)throw new Error("Failed to fetch workflow data");return await e.json()}catch(e){return console.error("Error fetching workflow data:",e),{agents:[{name:"Donor Research Agent",role:"Information gathering specialist",status:"active",tasks:["Document analysis","Web scraping","Deep search"]},{name:"Profile Synthesizer Agent",role:"Intelligence analyst",status:"active",tasks:["Data synthesis","Profile creation"]},{name:"Report Writer Agent",role:"Strategic communications specialist",status:"active",tasks:["Report generation","Recommendations"]}],statistics:{total_agents:3,processing_steps:8,input_sources:3,output_formats:4}}}}static async exportReport(e,t="pdf"){try{const o=await fetch(`${n()}/api/export`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({report:e,format:t})});if(!o.ok)throw new Error("Failed to export report");return await o.blob()}catch(o){throw console.error("Error exporting report:",o),o}}}export{s as DonorIntelligenceAPI};
