import com.unified.jenkins_dsl.utils.BaseUtils

//import factories.ReplaceThisTextWithNewJob

env = "$ENVIRONMENT_TYPE"
defaultBuildParamValue = env == "prod" ? "$TAG_NAME" : 'master'
isTestingVersion = "$RUN_AS_TEST_SEED"
folderLabelFull = "$NEW_JOBS_PARENT_SUBFOLDER_FULLNAME_PREFIX"

def projectConfigPath = 'scripts/build/jenkins_dsl_scripts/dsl_config_datafiles/microservice_dsl_config_data.groovy'
def config = BaseUtils.slurpConfig(this, projectConfigPath)

String projectName = "hackathon_2022_pseudocoders"
String suffix = ''

//------------------------------------------------------------------------------
// Custom Jobs - Misc_hackathon_2022_pseudocoders_Jobs
//------------------------------------------------------------------------------
//ReplaceThisTextWithNewJob.createJob(this, env, config, projectName, defaultBuildParamValue, suffix, folderLabelFull)
