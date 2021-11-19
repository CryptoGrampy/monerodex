import YAML from 'yaml'
import fs from 'fs'
import path from 'path'

export interface ProjectDataProtocolV1 {
  name: string
  description: string
  repositoryUrl?: string
  skills: string[]
  contact: string
  categories: string[]
  websiteUrl?: string
  tags: string[]
  guideUrl?: string
  contributorGuideUrl?: string
  helpWanted: boolean
}

export interface MoneroProjectpediaV1 {
  projects: ProjectDataProtocolV1[]
  meta: {
    modifiedDate: Date
  }
}

// TODO: Fix filepathing
const directoryPath = path.join(__dirname, '../projects');
const projectpedia: MoneroProjectpediaV1 = {
  projects: [],
  meta: {
    modifiedDate: new Date()
  }
}

// Parse all Yaml in projects folder

fs.readdir(directoryPath, (err, files) => {
  if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    files.forEach((file) => {
        const yamlFiles = fs.readFileSync(`./projects/${file}`, 'utf8')

        const project: ProjectDataProtocolV1 = YAML.parse(yamlFiles)
        projectpedia.projects.push(project)
    });


  // Generate JSON output

  fs.writeFileSync('./out/monero-projectpedia.json', JSON.stringify(projectpedia), 'utf8')
});
