microservice {
    hackathon_2022_pseudocoders {
        scm {
            reponame = 'hackathon-2022-pseudocoders'
            url = 'https://github.com/Unified/hackathon-2022-pseudocoders.git'
            gitUrl = 'git@github.com:Unified/hackathon-2022-pseudocoders.git'
            urlSrcDSL = 'https://github.com/Unified/Base.git'
            gitUrlSrcDSL = 'git@github.com:Unified/Base.git'
            branch = 'master'
            srcDSLbranch = 'master'
            //usernameOfCredentials = 'jenkins-unified'
            usernameOfCredentials = 'd6e29dff-b49c-453e-a525-2f55f1103af4'
            userToExclude = """\
                jenkins-unified
                jenkins
                Jenkins Slave user""".stripIndent()
            msgToExclude = '(?s)^v[0-9]+\\.[0-9]+\\.[0-9]+.*'
            //msgToExclude = '(?s)^Setting version to .*'
            checkoutSubdir = '\$WORKSPACE'
            githubTokenCredsId = 'jenkins-unified-2018-github-api-token'
            stage {
                branch = 'master'
                githubTokenCredsId = 'a836197d-df5b-471a-a912-eacd59da185f'
            }
            prod {
                branch = 'master'
                githubTokenCredsId = 'jenkins-unified-2018-github-api-token'
            }
        }
        serviceUser = 'root'
        serviceName = 'supervisord'
        rpmBasename = 'hackathon-2022-pseudocoders'
        rpmDescription = 'The new hackathon-2022-pseudocoders'
        appBasename = 'hackathon-2022-pseudocoders'
        appPackageSrcHomeDir = '\${WORKSPACE}'
        appDeployHomeDir = "/opt/unified/hackathon_2022_pseudocoders"
        artifactId = 'hackathon-2022-pseudocoders'
        projectDefaultTab = 'hackathon_2022_pseudocoders'
        jobsBaseName = 'hackathon_2022_pseudocoders'
        envnum = '0001'
        usesEnvWrapper = 'none'
        envWrapperVersion = 'none'
        label = 'generic'
        pr01JobDisabled = false
        release02JobDisabled = false
        package03JobDisabled = true
        deploy04JobDisabled = true
        manageService10JobDisabled = true
        enableReleaseJobDownstreamTrigger = true
        enableCodeCoverage = false
        lintPattern = '*lint.xml'
        junitPattern = 'junitResults/**/*.xml'
        cobertura {
            pattern = 'coverage/**/*.xml'
            conditionalTarget = 70
            lineTarget = 80
            methodTarget = 80
            methodIncludeInPRjob = false
        }
        preBuildStepsScriptEnvVars = '''\
            PROJECT_NAME="hackathon-2022-pseudocoders" \\
            BUILD_TYPE="python"  \\
            DIR_BASE=~/repo/Base \\
            bash'''.stripIndent()
        preBuildStepsScriptFilepath = '~/repo/Base/src/main/scripts/build/release/pre_trunk_release.sh'
        postBuildStepsScriptEnvVars = '''\
            PROJECT_NAME="hackathon-2022-pseudocoders" \\
            BUILD_TYPE="python"  \\
            DIR_BASE=~/repo/Base \\
            bash'''.stripIndent()
        postBuildStepsScriptFilepath = '~/repo/Base/src/main/scripts/build/release/post_trunk_release.sh'
        buildScriptEnvVars = 'bash'
        buildScriptFilepath = '"\${WORKSPACE}/scripts/build/jenkins_build.sh"'
        prePackageSteps = ''
        hotfixPostDeployScriptEnvVars = 'GIT_TOKEN=\${GITHUB_TOKEN} DIR_BASE=~/repo/Base bash'
        hotfixPostDeployScriptFilepath = '~/repo/Base/src/main/scripts/build/release/hotfix.sh'
        manageServiceShellCommands = '''\
            sleep 5; mco service supervisord \${SERVICE_ACTION} -F hostname="/\${ENVIRONMENT_TYPE}-\${ENVIRONMENT_ID}-\${APP_BASENAME}-/" -t 720
        '''.stripIndent()
        subfolders {
            stage {
                folderNames = []
                //includeTempTestingDir = 'true'
            }
            prod {
                folderNames = []
            }
        }
        // New Stuff
        pr_cron_expr = "H/5 * * * *"
    }
}