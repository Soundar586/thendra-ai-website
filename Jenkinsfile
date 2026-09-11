pipeline {
    agent any

    stages {

        stage('CHECKOUT') {
            steps {
                checkout scm
            }
        }

        stage('VALIDATE') {
            steps {
                bat '''
                    @echo off

                    if not exist "index.html" (
                        echo ERROR: index.html is missing.
                        exit /b 1
                    )

                    if not exist "assets" (
                        echo ERROR: assets directory is missing.
                        exit /b 1
                    )

                    if not exist "assets\\style.css" (
                        echo ERROR: assets\\style.css is missing.
                        exit /b 1
                    )

                    if not exist "assets\\app.js" (
                        echo ERROR: assets\\app.js is missing.
                        exit /b 1
                    )

                    echo Validation successful.
                '''
            }
        }

        stage('BUILD') {
            steps {
                bat '''
                    @echo off

                    if exist "build" rmdir /s /q "build"

                    mkdir "build"

                    copy /Y "*.html" "build\\" >nul

                    xcopy "assets" "build\\assets" /E /I /Y >nul

                    echo Build completed successfully.
                '''
            }
        }

        stage('TEST') {
            steps {
                bat '''
                    @echo off

                    if not exist "build\\index.html" (
                        echo ERROR: build\\index.html is missing.
                        exit /b 1
                    )

                    if not exist "build\\assets\\style.css" (
                        echo ERROR: build\\assets\\style.css is missing.
                        exit /b 1
                    )

                    if not exist "build\\assets\\app.js" (
                        echo ERROR: build\\assets\\app.js is missing.
                        exit /b 1
                    )

                    if not exist "build\\assets" (
                        echo ERROR: build\\assets directory is missing.
                        exit /b 1
                    )

                    echo Tests passed successfully.
                '''
            }
        }

        stage('DEPLOY') {
            steps {
                bat '''
                    @echo off

                    if exist "C:\\thendra-deploy" (
                        rmdir /s /q "C:\\thendra-deploy"
                    )

                    mkdir "C:\\thendra-deploy"

                    xcopy "build" "C:\\thendra-deploy" /E /I /Y >nul

                    echo Deployment completed successfully.
                '''
            }
        }
    }

    post {
        success {
            echo 'THENDRA AI static website pipeline completed successfully.'
        }

        failure {
            echo 'THENDRA AI static website pipeline failed.'
        }
    }
}