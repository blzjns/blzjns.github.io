import github from '../../github-mark-white.svg';

export default function Resume() {
  return (
    <div className="pt-0 p-7">
      <div className="md:flex justify-between mb-7">
        <span className="text-3xl md:text-5xl bg-emerald-400 font-bold w-max h-min">
          &nbsp;JONAS HOEHNE-SILVA&nbsp;
        </span>

        <div
          id="contactMe"
          className="flex flex-col mt-5 md:mt-0 md:text-right"
        >
          <span>Montreal, Canada 🏠</span>
          <span>+1 437 427 9276 📞</span>
          <span>jonashoehnes@gmail.com 📧</span>
          <span>
            <a href="https://github.com/blzjns" className="flex flex-row">
              <span className="text-emerald-200">
                https://github.com/blzjns
              </span>
              <img
                src={github}
                style={{
                  width: '19px',
                  height: '19px',
                  marginLeft: '15px',
                  marginTop: '3px'
                }}
              ></img>
            </a>
          </span>
        </div>
      </div>
      <div id="quote">
        Experience in Software Engineering, Development, and Tech. Support –
        Pragmatic, eager to learn and aspired to enrich and unlock not only my
        knowledge and potential, but also others.
      </div>
      <br />
      <hr />
      <br />
      <div className="flex flex-col mb-5">
        <span className="text-1xl md:text-3xl bg-emerald-400 font-bold w-max h-min mb-3">
          &nbsp;SKILLS / DEV. STACK&nbsp;
        </span>
        <span>
          <span className="text-emerald-600 font-bold">Coding languages:</span>{' '}
          JavaScript/TypeScript, Java/Scala, Golang, .Net (C#, VB), Bash, SQL,
          and Python.
        </span>
        <br />
        <span>
          <span className="text-emerald-600 font-bold">Technologies:</span> Git,
          Node.js/Next.js, Graphql, React/Angular, jQuery,
          Jest/Mocha/Jasmine/Karma, HTML, CSS/Sass/Less, Bootstrap, Spring,
          Maven, Gradle, MySQL/HANA/SQLServer, MongoDB, Kubernetes, Docker,
          Cloud Foundry, Codepipeline/Travis/Jenkins, AWS/Azure/GCP -{' '}
          <span className="text-emerald-600 font-bold">
            also interested in:
          </span>{' '}
          WebAssembly, WebGL, Rust, Flutter, Computer Vision [OpenCV, dLib], and
          Machine Learning [JAX, TensorFlow].
        </span>
      </div>
      <div className="flex flex-col mb-5">
        <div className="text-1xl md:text-3xl bg-emerald-400 font-bold w-max h-min mb-3">
          &nbsp;PROFESSIONAL EXPERIENCE&nbsp;
        </div>
        <div id="amazonXP" className="flex flex-col pb-5">
          <span className="text-emerald-600 font-bold">
            Amazon, Toronto - Senior Software Engineer
          </span>
          <span className="text-gray-400">JUN 2022 - MAR 2025</span>
          <span className="">
            Full stack engineer focused on frontend solutions for Amazon Ads on
            a DSP application:
            <ul className="list-[square] ml-5">
              <li>
                Maintained a large code base app where I was dedicated to
                develop Campaign management and optimization solutions to
                accelerate ad-buying and facilitate the visualization of
                customer's campaigns and its metrics (e.g ROAS, CPTR,
                Impressions) through charts and graphs
              </li>
              <li>
                Improved UI with 4x less redundant functions per state change to
                the JavaScript callstack - resulting in faster performance on
                critical rendering changes, and significantly improving
                responsiveness across campaign management workflows
              </li>
              <li>
                Led the migration of different monolith components to
                micro-frontends, and even prototyped AI solutions winning 2nd
                place in an internal hackathon
              </li>
              <li>
                Implemented a component-tracking solution to store events from
                the UI, for example the total time for an end-user to finalize
                an order. That was used to troubleshoot rendering slow downs
              </li>
              <li>
                Obsessed on delivering solutions that Reduced num of clicks to
                target-action, Tracked UI component-usage, Maintained/Gained
                rendering performance
              </li>
              <li>
                Wrote 3 apps to speed up internal processes: an Slack webhook
                integration to automate critical notifications on failed
                deployments, and 2 Tampermonkey scripts - one that provide logs
                from AWS Cloudwatch and other internal monitoring tools to help
                on-call analyze auto-alarm tickets, and the other to hide git
                changes that are related to 'tests', 'config', or 'data' files
                to speed up code review
              </li>
            </ul>
          </span>
        </div>
        <div id="hpeXP" className="flex flex-col pb-5">
          <span className="text-emerald-600 font-bold">
            Hewlett Packard Enterprise, Montreal - Security Software Engineer
          </span>
          <span className="text-gray-400">MAR 2022 - JUN 2022</span>
          <span className="">
            Short experience as a Backend engineer implementing RAPIDS (Real
            time automated personnel id system) wireless network solutions for
            cloud security applications running on HPE Aruba access-point
            routers:
            <ul className="list-[square] ml-5">
              <li>
                Maintained WIDS (Wireless Intrusion Detection) features running
                on Aruba access point devices writing Scala
              </li>
              <li>
                Automated the old vulnerability check system for changes in
                docker container images using Trivy reports, and lot of bash
                scripts running on Suse, CentOS, and RHEL linux images
              </li>
              <li>
                Worked on replacing event consumption from RabbitMQ to Kafka
              </li>
            </ul>
          </span>
        </div>

        <div id="kronosXP" className="flex flex-col pb-5">
          <span className="text-emerald-600 font-bold">
            Kronos | UKG, Montreal - Fullstack Developer
          </span>
          <span className="text-gray-400">NOV 2019 - OCT 2020</span>
          <span className="">
            Maintained a large code base Workforce Management app, focused on
            frontend and graphql:
            <ul className="list-[square] ml-5">
              <li>
                Maintained the frontend TypeScript/Angular code for a WFM
                application
              </li>
              <li>
                Promoted the use of Graphql on Node.js to improve data
                over/under fetching; that also simplified the API design process
                enabling frontend devs to also collaborate on the API definition
                process through .graphql files
              </li>
              <li>
                Also, introduced a POC Graphql client-server using Kotlin to
                expose existing Java APIs for a future version of the commercial
                API
              </li>
              <li>
                Contributed with a command-line tool to facilitate the dev. env.
                setup and automated deploying story PRs to production build on
                Jenkins
              </li>
              <li>
                Actively promoted repository (.md) documentation and ended up
                writing this presentation
              </li>
              <li>
                Introduced git-url dependencies to create project independency
                on a mono-frontend repository
              </li>
            </ul>
          </span>
        </div>

        <div id="sapXP" className="flex flex-col pb-5">
          <span className="text-emerald-600 font-bold">
            SAP, Montreal - Cloud Engineer/Frontend Developer
          </span>
          <span className="text-gray-400">JUN 2016 - NOV 2019</span>
          <span className="">
            Supported cloud customers adopting Kyma and developed internal tools
            aiming to make internal processes and communication more efficient:
            <ul className="list-[square] ml-5">
              <li>
                Debugged and implemented different integrations between B2C/B2B
                systems using SAP Kyma
              </li>
              <li>
                Went to SAP Labs in Gliwice to meet the Kyma R&D team and help
                defining the support process for customers adopting newer cloud
                solutions
              </li>
              <li>
                Developed a command-line tool using Golang to help visualizing
                Kubernetes pod resources for cloud customers
              </li>
              <li>
                Co-pioneered and maintained an internal application for Business
                Intelligence (SAP CX BI) that succeeded to global deployment and
                adoption of over 500 active users. Used Angular and Node.js to
                build a CMS app that draws Chart.js and D3 data visualizations.
                Also, wrote its Slack chatbot integration which reached approx.
                3000 calls per month
              </li>
              <li>
                Had significant contribution on extending the company's chatbot
                bootstrap (tobi), and helped on maintaining internal chatbot
                APIs
              </li>
              <li>
                Learned about micro-frontend (MFE) concepts and played with
                projects like SAP Luigi
              </li>
            </ul>
          </span>
        </div>

        <div id="1sapXP" className="flex flex-col pb-5">
          <span className="text-emerald-600 font-bold">
            SAP, Montreal - Frontend Developer Fellowship
          </span>
          <span className="text-gray-400">JUN 2016 - SEP 2016</span>
          <span className="">
            3 mos. Frontend Developer experience for SAP Marketing Cloud:
            <ul className="list-[square] ml-5">
              <li>
                Developed two features for a marketing product - one to manage
                enterprise brands, and the other to analyze and generate online
                campaigns via Email, Twitter, and Facebook
              </li>
              <li>
                Wrote different OData services and automated UI tests using
                QUnit and Sinon.js
              </li>
            </ul>
          </span>
        </div>

        <div id="2sapXP" className="flex flex-col pb-5">
          <span className="text-emerald-600 font-bold">
            SAP, Montreal - Senior Developer Support Engineer
          </span>
          <span className="text-gray-400">AUG 2013 - JUN 2016</span>
          <span className="">
            Started on SAP Business One and moved internally to Hybris (now SAP
            CRM/CX) to a Senior role to continue providing development support
            and consulting to customers:
            <ul className="list-[square] ml-5">
              <li>
                Wrote custom add-ons/plugins/workflows to SAP Business One using
                C#, JavaScript/SAPUI5 and HANA/XS Engine, and also built data
                integration flows with B1iF
              </li>
              <li>
                Was sent to SAP Labs in Shanghai to participate on an internal
                project for a B1iF Solution, i.e. Intercompany
              </li>
              <li>
                Supported customers guiding technical implementations and
                writing code customizations using Java/Groovy and JavaScript for
                an e-commerce framework
              </li>
              <li>
                Worked close to R&D teams providing them deep analysis of
                customer issues
              </li>
              <li>
                While working with YaaS I also wrote vscode-raml which had over
                25k downloads
              </li>
              <li>
                Created an internal client-to-project generator based on RAML
                definitions - the script focused on generating Node.js, Go,
                Java, and Postman collections client-projects
              </li>
              <li>
                Contributed with several technical-knowledge documentation
              </li>
            </ul>
          </span>
        </div>
      </div>

      <div className="flex flex-col mb-5">
        <div className="text-1xl md:text-3xl bg-emerald-400 font-bold w-max h-min mb-3">
          &nbsp;EDUCATION&nbsp;
        </div>
        <ul className="list-[square] ml-5">
          <li>Computer Science - Concordia University - Montreal (2013)</li>
          <li>Software Analysis and Development - FATEC - Sao Paulo (2011)</li>
          <li>Computer Technician - ETEC - Sao Paulo (2009)</li>
        </ul>
      </div>

      <div className="flex flex-col mb-5">
        <div className="text-1xl md:text-3xl bg-emerald-400 font-bold w-max h-min mb-3">
          &nbsp;CAREER PROJECTS&nbsp;
        </div>
        <ul className="list-[square] ml-5">
          <li>
            mood-recog: In 2016 I worked with my friend André Pires and
            developed an API that classifies people's mood on an image. It was
            used in the company's conference to collect the audience's mood
            while attending a keynote, apart from the computer vision API we
            also created an UI to help the conference's staff upload images to
            our dashboard showing "people's satisfaction" with the event.
          </li>
          <li>
            smart-scale: In 2018 I worked on an IoT project using RaspberryPi to
            calculate the quantity of an item on a weight scale. The scale was
            placed in our fridge and had an UI to let us know how many pop cans
            we had left.
          </li>
        </ul>
      </div>
    </div>
  );
}
