/* ============================================================
   DATA — edit this file to update quizzes and knowledge.
   - New quiz: add an object to the `quizzes` array.
   - Question types: "single" (one answer), "multi" (several answers), "tf" (True/False).
     answer = option index starting at 0 (A=0, B=1, ...). "multi" uses an array, e.g. [0,1,3].
     "tf": answer 0 = True, 1 = False.
   - New knowledge entry: add an object to `knowledge`.
     cat = section name, kind = "law" or "tip".
   ============================================================ */
const DATA = {
quizzes: [
{ id:"w1", title:"Week 1 — You Got a Job Offer!", desc:"Job offers, reading contracts, probation, and how to protect yourself when starting out.",
questions: [
{ type:"single", q:"A company sends Linh an offer letter describing the job title, salary, and expected start date. What should Linh understand?",
  options:["It guarantees that the company can never change the offer.","It means she can ignore any later written agreement.","It communicates the job offer, but she should check the terms and next steps.","It is always the same as an employment contract."], answer:2,
  exp:"An offer letter usually announces the job offer and its expected terms, but you should not assume every offer letter has the same legal effect as an employment contract. Read the actual content and the next steps carefully.", ref:"Article 13, Labor Code 2019" },
{ type:"single", q:"Before accepting a job, which information is most important for a new graduate to review?",
  options:["Only the company’s social media followers.","Job duties, salary, working hours, probation terms, and proposed start date.","Only the company logo and office location.","Only the job title and the interviewer’s name."], answer:1,
  exp:"Employers must give truthful information about the job, workplace, working conditions, working and rest hours, and pay. These are also the main contents of an employment contract.", ref:"Articles 16 and 21" },
{ type:"single", q:"A recruiter asks Mai to pay a personal fee directly to the recruiter to secure a job interview. What is the safest response?",
  options:["Send a photo of her payment card to speed up the process.","Pay immediately because every recruiter requires this.","Send her bank password to prove that she can pay.","Ask for written details and independently verify the request before paying anything."], answer:3,
  exp:"This is practical job-search safety advice, not a claim that every recruitment fee is automatically illegal. Being asked to pay an individual to “secure” a job is a warning sign: verify who is asking, the hiring company, and the reason for the fee before sending any money.", ref:"Job-search safety tip" },
{ type:"tf", q:"In Vietnam, the name given to a document is not the only factor in deciding whether an agreement is legally an employment contract; its content and the actual working arrangement can matter.",
  answer:0,
  exp:"True. An agreement under another name can still be treated as an employment contract if its content shows paid work under one party’s management, direction, and supervision. You cannot rely on the title alone (service agreement, collaboration agreement, etc.).", ref:"Article 13, Labor Code 2019" },
{ type:"multi", q:"Which details should a new graduate check carefully in a proposed employment agreement? Select all that apply.",
  options:["The salary and how it will be paid.","The job and main duties.","The recruiter’s favorite movie.","The working hours and work location."], answer:[0,1,3],
  exp:"An employment contract must include key terms such as the job and work location, salary, form and timing of pay, and working and rest hours. The recruiter’s taste in movies is irrelevant.", ref:"Clause 1, Article 21" },
{ type:"single", q:"An employer asks Nam to sign an employment document immediately, but he has not had time to read it. What should he do?",
  options:["Ask for time to read it and clarify any unclear terms before signing.","Ignore the document and assume there are no agreed terms.","Let a colleague sign his name without permission.","Sign without reading because the employer prepared it."], answer:0,
  exp:"Contracts are based on voluntariness, equality, good faith, cooperation, and honesty. Reading carefully and asking about unclear terms before signing is the prudent move (practical advice, not wording found in the law).", ref:"Article 15, Labor Code 2019" },
{ type:"tf", q:"A job applicant should share their online banking password with an employer if the employer says it is needed to prepare payroll.",
  answer:1,
  exp:"False. Banking passwords, OTP codes, and login details are security credentials and are never needed to pay your salary. You only need to give your account number. This is financial-safety knowledge rather than a direct provision of the Labor Code.", ref:"Account security tip" },
{ type:"single", q:"A company tells a new employee that the probation period is unpaid in every case. What should the employee do?",
  options:["Accept this because probation is never covered by labor law.","Assume the probation terms do not need to be discussed.","Check the applicable probation rules and seek clarification about the proposed pay.","Assume the company can set any probation condition it wants."], answer:2,
  exp:"Probation pay is agreed by both sides but must be at least 85% of the normal salary for that job. Saying probation is “always unpaid” does not match this rule.", ref:"Article 26, Labor Code 2019" },
{ type:"single", q:"A recruiter asks an applicant to leave their original identity documents with the company as a condition of getting the job. What is the best response under Vietnamese labor law?",
  options:["Give the documents to another employee to store secretly.","Ask the employer to keep the documents only until the first payday.","Do not hand over the originals; ask about lawful ways to verify identity.","Leave all original personal documents with the employer indefinitely."], answer:2,
  exp:"Employers may not keep the original identity documents, degrees, or certificates of employees. Identity can be verified in other suitable ways (for example, showing the original for checking and submitting a copy).", ref:"Clause 1, Article 17, Labor Code 2019" },
{ type:"single", q:"Before starting a new job, which action best helps a graduate protect their interests?",
  options:["Rely only on verbal promises and keep no records.","Assume all company policies override Vietnamese labor law.","Keep a copy of relevant written employment documents and clarify important terms.","Ignore unclear clauses until a disagreement happens."], answer:2,
  exp:"In principle a contract is made in writing in two copies, one for each party (valid electronic contracts count as written). Keeping your copy and related documents gives you something to refer back to when needed.", ref:"Articles 14, 16, and 21" }
]}
],
knowledge: [
{ cat:"Hiring & Offers", kind:"law", title:"Employers must give truthful information", ref:"Article 16",
  body:"Employers must provide truthful information about the job, workplace, working conditions, working and rest hours, pay, and other related matters. Ask about these points and keep a record before you accept." },
{ cat:"Hiring & Offers", kind:"law", title:"An offer letter is not automatically an employment contract", ref:"Article 13",
  body:"An offer letter usually announces the offer and expected terms. Its legal effect depends on its actual content, so read the terms and next steps instead of assuming it works like a contract." },
{ cat:"Employment Contracts", kind:"law", title:"The name of an agreement does not decide its nature", ref:"Article 13",
  body:"An agreement under a different name (such as a service or collaboration agreement) can still be treated as an employment contract if its content shows paid work under one party’s management, direction, and supervision." },
{ cat:"Employment Contracts", kind:"law", title:"Form of an employment contract", ref:"Article 14",
  body:"In principle, a contract is made in writing in two copies, one kept by each party, unless the law allows another form. An electronic contract that meets the requirements has the same value as a written one." },
{ cat:"Employment Contracts", kind:"law", title:"Principles of entering a contract", ref:"Article 15",
  body:"Contracts are based on voluntariness, equality, good faith, cooperation, and honesty. You have the right to read carefully and ask about unclear terms before agreeing." },
{ cat:"Employment Contracts", kind:"law", title:"Key contents of an employment contract", ref:"Clause 1, Article 21",
  body:"Check carefully: the job and work location, contract term, salary with the form and timing of payment, and working and rest hours." },
{ cat:"Probation", kind:"law", title:"Probation pay is at least 85%", ref:"Article 26",
  body:"Probation pay is agreed by both sides but must be at least 85% of the normal salary for that job. Probation therefore cannot simply be unpaid by default." },
{ cat:"Your Rights", kind:"law", title:"Employers cannot keep your original IDs or degrees", ref:"Clause 1, Article 17",
  body:"Employers may not hold the original identity documents, degrees, or certificates of employees. If verification is needed, offer other ways such as showing the original and handing over a copy." },
{ cat:"Job-Search Safety", kind:"tip", title:"Be wary of paying to get a job", ref:"Practical advice",
  body:"If someone asks you to pay a personal fee for an interview or a job, ask for the details in writing and independently verify who is asking, the hiring company, and the reason for the fee before paying. This is safety advice, not a claim that every fee is illegal." },
{ cat:"Job-Search Safety", kind:"tip", title:"Never share banking passwords or OTP codes", ref:"Practical advice",
  body:"To receive your salary you only need to provide your account number. Never give your password, OTP code, or login details to anyone, including an employer." },
{ cat:"Job-Search Safety", kind:"tip", title:"Keep records before you start", ref:"Practical advice",
  body:"Keep copies of your offer, contract, and related documents, including electronic ones. Do not rely only on verbal promises; ask about anything unclear and get the answer in writing." }
]};
