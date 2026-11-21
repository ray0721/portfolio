// EDIT THIS FILE to update the site content.
/* ===== EDIT THIS BLOCK TO UPDATE THE SITE ===== */
export const DATA: any = {
 email:"",            // your verified contact email
 photo:"/rayhan.jpg",            // portrait image URL or path, e.g. "images/rayhan.jpg"
 cvUrl:"",            // link to your CV PDF
 links:{GitHub:"https://github.com/ray0721",LinkedIn:"https://www.linkedin.com/in/ray-07/","Google Scholar":"https://scholar.google.com/citations?hl=en&user=vi3qm9wAAAAJ",ORCID:"https://orcid.org/0009-0008-6413-5875",ResearchGate:"https://www.researchgate.net/profile/Md-Rayhan-Hossain-3","Tableau Public":"https://public.tableau.com/app/profile/md.rayhan.hossain3089/vizzes"},
 articles:[
  // {title:"",category:"Marketing Analytics",date:"",minutes:5,summary:"",url:""}   categories: AI, Business Analytics, Marketing Analytics, Machine Learning, Data Visualization, Research Methodology
 ],
 cvFiles:[
  {label:"Academic CV",desc:"Education, research, publications, and academic activities.",url:""},
  {label:"Professional resume",desc:"Experience, skills, and projects for industry roles.",url:""},
  {label:"Research portfolio summary",desc:"Research interests, publication, and featured analytics work.",url:""}
 ],
 development:[
  // {type:"Workshop",title:"",org:"",date:"",url:""}   types: Workshop, Training, Presentation, Conference, Peer review
 ],
 projectDetails:{
  "Customer Churn & Retention Analysis":{overview:"Tableau dashboard analyzing why customers leave and which segments carry the highest churn risk.",dataset:"Telecom customer subscription dataset (public sample data).",tools:["Tableau"],
   findings:["Overall churn rate is 26.5%, indicating moderate customer attrition.","Customers in their first 6 months show the highest churn risk.","Mid-tier pricing customers ($50–$99) churn more than low-price customers.","Month-to-month contracts drive the majority of churn compared with long-term plans."]},
  "Marketing Funnel Performance Dashboard":{overview:"Tableau dashboard analyzing lead acquisition and conversion efficiency across marketing channels.",dataset:"Olist dataset.",tools:["Tableau"],
   findings:["The dashboard reports 8,000 total leads, 799 conversions, and a 9.99% conversion rate."]},
  "Amazon Product Sales & Customer Insights Dashboard":{overview:"Hands-on Tableau project analyzing Amazon product data to understand pricing patterns, customer engagement, and review behavior across categories.",tools:["Tableau"],
   findings:["A small number of products dominate review volume, indicating strong brand trust and repeat purchases.","Most products cluster between 3.8 and 4.5 ratings, but higher ratings do not always result in higher review volume.","Home & Kitchen and Electronics have higher average prices, while computer accessories remain more affordable."]},
  "E-commerce Cohort Retention Analysis":{overview:"Cohort-based retention dashboard in Tableau showing how customer retention evolves after first purchase.",dataset:"E-commerce customer data with monthly acquisition cohorts from January to December 2019.",tools:["Tableau"],
   method:"Retention heatmap by months since first purchase, an average retention trend view, and a combined cohort retention dashboard."},
  "Marketing Spend ROI Analysis":{overview:"Analysis of marketing performance across TV, Radio, and Newspaper channels, focused on ROAS and marketing mix, with a Tableau dashboard.",tools:["SQL","Google BigQuery","Regression modeling","Tableau"],
   method:"SQL in BigQuery for data preparation and regression modeling for channel effects.",findings:["The Tableau dashboard shows total marketing spend of 40,175, total sales of 8,423, and ROAS of 0.21."],github:"https://github.com/ray0721/marketing-spend-roi-sql-bigquery"},
  "Coffee Chain Profitability Analysis":{overview:"Tableau analysis of sales and profit for a U.S. retail coffee chain, covering market performance, California product analysis, and geographic performance.",dataset:"U.S. retail coffee chain dataset.",tools:["Tableau"]},
  // Copy this template for each project. The key must match the project title above exactly. Empty fields stay hidden.
  // "Customer Churn & Retention Analysis":{overview:"",problem:"",question:"",dataset:"",tools:["Python","Tableau"],method:"",process:"",findings:[""],recommendations:[""],github:"",live:"",docs:"",images:[]}
 },
 dashboards:[
  // {title:"",description:"",source:"",method:"",embedUrl:"https://public.tableau.com/views/WORKBOOK/SHEET?:showVizHome=no&:embed=true",url:"Tableau Public page",preview:"image path"}
 ],
 metrics:{citations:null,hIndex:null,source:""},   // add only verified numbers; empty values stay hidden
 publications:[
  {title:"Cross-channel temporal fusion for retail customer lifetime value prediction: architecture, ablation, and causal validation of a gated BiGRU fusion network",
   authors:[["Sheikh Md","Faysal"],["Sharmin","Sultana"],["Urmi","Haldar"],["Md Rashel","Miah"],["Amena","Akther"],["Md Rayhan","Hossain"],["Md Mamun","Hossain"],["Sudipta","Acharjee"],["Denis","Kovalenko",true]],
   journal:"Frontiers in Artificial Intelligence",section:"AI in Business",type:"Original Research Article",year:2026,date:"November 11, 2026",volume:"9",article:"1956496",
   doi:"10.3389/frai.2026.1956496",url:"https://www.frontiersin.org/journals/artificial-intelligence/articles/10.3389/frai.2026.1956496/full",
   topics:["AI in Business","Customer Lifetime Value","Machine Learning","Causal Inference"],
   abstract:"The paper proposes a two-branch neural network that predicts retail customer lifetime value by combining weekly purchase sequences with summary features through a learned per-household gate. It is tested on about 2.58 million grocery transactions from 2,500 households. At this sample size the summary features alone ranked customers slightly better than the full model, while gated fusion beat simple concatenation. Marketing channel features were weak predictors, yet matching and difference-in-differences analyses found a positive causal effect of omnichannel engagement on customer value."}
 ],
 credentials:[
  {title:"SAP Student Recognition Award",issuer:"SAP University Alliances · Wright State University",date:"May 2026",note:"Recognition for satisfactory completion of an academic program supported by the SAP product portfolio.",url:""}
  // add more: {title:"",issuer:"",date:"",note:"",url:"verification link"}
 ],
 projects:[
  ["Customer Churn & Retention Analysis","Customer Analytics"],["Marketing Funnel Performance Dashboard","Marketing Analytics"],
  ["Amazon Product Sales & Customer Insights Dashboard","Business Intelligence"],["E-commerce Cohort Retention Analysis","Customer Analytics"],
  ["Marketing Spend ROI Analysis","Marketing Analytics"],["Coffee Chain Profitability Analysis","Business Intelligence"],
  ["RFM Customer Segmentation","Marketing Analytics"],["Healthcare Diabetes Analytics","Healthcare Analytics"],
  ["Enterprise Systems & Predictive Analytics","Machine Learning"],["Pilot Adoption and Library Resource Usage","Academic Analytics"]
 ],
 skills:{
  "Business Intelligence":["Tableau","Power BI","Excel","Dashboard development"],
  "Data analytics":["SQL","Google BigQuery","Python","R"],
  "Machine learning":["RapidMiner","Predictive modeling","Classification","Model evaluation"],
  "Enterprise systems":["SAP HANA","SAP S/4HANA","ERP systems","Oracle NetSuite","Microsoft Dynamics"],
  "Marketing analytics":["Customer lifetime value","Customer segmentation","Retention","Marketing ROI","Cohort analysis"]
 }
};
