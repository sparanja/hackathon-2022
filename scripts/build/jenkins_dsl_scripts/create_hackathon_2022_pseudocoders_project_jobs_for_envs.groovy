import com.unified.jenkins_dsl.utils.BaseUtils
import com.unified.jenkins_dsl.utils.BaseProjectSubfolders

import com.unified.jenkins_dsl.factories.PythonMicroserviceCICD


env = "$ENVIRONMENT_TYPE"
folderLabelFull = "$NEW_JOBS_PARENT_SUBFOLDER_FULLNAME_PREFIX"

def projectConfigPath = 'scripts/build/jenkins_dsl_scripts/dsl_config_datafiles/microservice_dsl_config_data.groovy'
def config = BaseUtils.slurpConfig(this, projectConfigPath)

String projectName = "hackathon_2022_pseudocoders"
String suffix = ''

//def defaultBuildParamValue = env == 'prod' ? "$TAG_NAME" : 'master'

/**
 * Create subfolders and seed job within the project's subfolder
 *
 *  @param config        a map containing all config data
 *  @param projectname   a string
 *  @param suffix        a string
 *
 */
def createProjectSubfoldersWithSubfolderSeedJobs(config, projectname, suffix) {

    def projectData = config.microservice[projectname]
    def subfoldersData = projectData.subfolders[env]

    subfoldersData.folderNames.each { folder_label ->

        BaseProjectSubfolders.createChildSubfolderInParentSubfolder( this,
                                                                     env,
                                                                     config.microservice,
                                                                     projectname,
                                                                     "${projectname}",
                                                                     "${folder_label}",
                                                                     suffix )

        BaseProjectSubfolders.createSeedJobInSubfolder( this,
                                                        env,
                                                        config.microservice,
                                                        projectname,
                                                        "${folder_label}",
                                                        suffix,
                                                        "${folderLabelFull}" )

        /**
         *  Conditionally create Testing versions of a subfolder within the Project Folder
         *
         *   (Note: the official subfolder that is created by the above method calls,
         *          ... that subfolder is for officially merged in and releasable jenkins jobs ONLY. )
         *
         *    The Testing version subfolder provides a way to
         *     test your dsl code in jenkins before you merge it in.
         */
        if ( (subfoldersData.containsKey('includeTempTestingDir') == true )
             && ( subfoldersData.includeTempTestingDir == 'true' ) ) {

            /**
             *  Prefix the subfolder name within the Project Folder with "Temp_Testing_of_"
             *
             *   (Note: the official subfolder is only for official jenkins jobs.
             *          This provides a workspace for you dsl development )
             */
            def temp_testing_folder_label = "Temp_Testing_of_${folder_label}"

            BaseProjectSubfolders.createChildSubfolderInParentSubfolder( this,
                                                                         env,
                                                                         config.microservice,
                                                                         projectname,
                                                                         "${projectname}",
                                                                         "${temp_testing_folder_label}",
                                                                         suffix )

            BaseProjectSubfolders.createSeedJobInSubfolder( this,
                                                            env,
                                                            config.microservice,
                                                            projectname,
                                                            "${temp_testing_folder_label}",
                                                            suffix,
                                                            "${folderLabelFull}" )
        }
    }
}

//------------------------------------------------------------------------------
// Create the jobs for hackathon_2022_pseudocoders Trunk-based CI Workflow
//------------------------------------------------------------------------------
PythonMicroserviceCICD.createMicroservicePackageJob(this, env, config, projectName, suffix, folderLabelFull)
PythonMicroserviceCICD.createMicroserviceDeployJob(this, env, config, projectName, suffix, folderLabelFull)
PythonMicroserviceCICD.createMicroserviceManageServiceJob(this, env, config, projectName, suffix, folderLabelFull)

if (env == 'stage') {
    PythonMicroserviceCICD.createPullRequestsJob(this, env, config, projectName, suffix, folderLabelFull)
    PythonMicroserviceCICD.createTrunkBasedReleaseJob(this, env, config, projectName, suffix, folderLabelFull)
}

if (env == 'prod') {
    PythonMicroserviceCICD.createMicroserviceHotfixPostDeployJob(this, env, config, projectName, suffix, folderLabelFull)
}

// Create the Sub-Folders and Sub-Seed Jobs in Sub-Folders
createProjectSubfoldersWithSubfolderSeedJobs(config, projectName, suffix)
