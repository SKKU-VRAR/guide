---
layout: post
title: Git과 GitHub에 대하여
description: Git과 GitHub이 무엇인지, Git은 어떻게 설치하는지 알아봅시다.
categories: git github 깃 깃헙
by: DropFL (강원모)
icon: git-icon.svg
questions:
  - question: Git은 뭔가요?
    answer: |-
      #### Git은 분산형 버전 관리 프로그램 중에서 사실상 표준인 오픈소스 소프트웨어입니다.

      *[사실상 표준]: [de facto standard];&#013;표준으로 제정된 것은 아니지만 이미 많은 사람이 사용하여 표준과도 같음을 의미합니다.

      Git은 기본적으로 다음과 같은 기능을 지원합니다.

      * **데이터 무결성**: 저장소[^1] 내 파일들의 변경사항을 추적 및 보존하며, 이전 상태로 복구하는 것도 가능합니다.
      * **비선형 워크플로**: 작업 흐름을 나타내는 *브랜치*로 다음을 할 수 있습니다.
        - 개발 흐름의 **분리**: 동기화를 하기 전에는 다른 *브랜치*의 내용이 영향을 주지 않습니다.
        - 상태의 **동기화**: *브랜치* 간 동기화를 통해 각 파일의 내용을 합칠 수 있습니다.[^2]
        - 작업의 **전환** : 다른 *브랜치*로의 전환이 매우 쉽고 빠릅니다.
      * **분산형 워크플로**: 원격 저장소[^3]를 대상으로도 *브랜치*를 이용한 작업이 가능합니다.

      이처럼 강력한 기능들과 더불어 빠른 실행 속도[^4]로 인해 Git은 개발의 가속화와 협업의 간편화를 이뤘고, 그에 따라 최근에는 **개발자가 반드시 쓸 줄 알아야 하는 툴**이 되었습니다.

      [^1]: Repository; **폴더**같은 것으로 생각하면 됩니다.
      [^2]: 경우에 따라서는 충돌이 발생할 수 있는데, 이에 관해서는 나중에 알아보겠습니다.
      [^3]: Remote Repository; **공유 폴더**라고 볼 수 있습니다.
      [^4]: [이 글](https://gist.github.com/emanuelez/1758346)에 따르면, 1326개의 폴더와 19384개 파일로 구성된 저장소를 탐색하는 데에 16초, 캐시를 사용하면 **0.17초**가 소요되었습니다.

  - question: GitHub은 뭔가요?
    answer: |-
      #### GitHub은 Git에서 사용할 원격 저장소를 제공해주는 웹 서비스이자 웹 사이트입니다.

      {::options parse_block_html="true" /}
      {:A: style="color: crimson;"}
      {:B: style="color: #4466b4;"}

      **GitHub**은 Git과 달리 [웹 서비스](https://github.com)입니다. 앞에서 살짝 언급한 **원격 저장소**는 쉽게 말하면 클라우드에 있는 폴더를 의미하는데, GitHub은 그것을 지원하는 **클라우드 스토리지** 서비스라고 볼 수 있습니다. 즉, **Git**{:A}은 **로컬**에서 작동하는 프로그램이고, **GitHub**{:B}은 그와 연동되는 **인터넷** 상의 서버입니다.

      <button class="collapsible">
      **최근 들어 GitHub은 그 이상의 기능을 하고 있습니다.**
      </button>

      <div class="collapsible-content">
      * GitHub은 현재 **가장 큰 오픈소스 허브**라고 봐도 무방합니다. [Python](https://github.com/python/cpython), [리눅스](https://github.com/torvalds/linux), [Git](https://github.com/git/git), 심지어는 [Windows 계산기](https://github.com/microsoft/calculator)도 GitHub의 원격 저장소에 업로드되어 있습니다. 그리고 이러한 오픈소스 프로젝트가 수많은 사람들에 의해 개발되고 있습니다.
      * Google, Microsoft, Facebook 등의 대기업들을 비롯한 수많은 기업들이 여기에 참여하고 있는데, 그에 따라 GitHub에서의 오픈소스 활동 자체가 **취업의 기회**를 제공하는 경우도 많습니다.

      * 굳이 오픈소스 활동이 없더라도, GitHub 프로필은 **포트폴리오**로 활용될 수 있습니다. 최근에는 개발자 포트폴리오를 GitHub 프로필 링크로 대체하는 경우도 있습니다. Git 및 GitHub 경험은 사실상 필수라고 여기며, 여러분의 원격 저장소를 둘러보는 것이 **여러분의 실력을 확인하는 가장 쉽고 직관적인 방법**이기 때문입니다.

          특히 [GitHub Pages](https://pages.github.com/)를 통해 웹 사이트 형태의 포트폴리오를 제작하거나, 블로그를 운영하는 등의 작업을 비교적 손쉽게 할 수 있습니다. 이 사이트 또한 GitHub Pages로 만들어 졌습니다.
      </div>

  - question: Git은 어떻게 설치하나요?
    answer: |-
      운영체제에 따라 조금씩 달라집니다.

      먼저 Git이 설치되어 있는지 확인하세요! Mac이나 Linux의 경우 터미널을 켜서 `git --version`을 쳤을 때, 버전 명이 나온다면 해당 버전의 Git이 설치된 것입니다. Windows의 경우, Git Bash가 존재하거나 CMD에서 `git --version`을 입력했을 때 버전 명이 나온다면 Git이 설치된 것입니다. 이는 설치 후 확인할 때에도 적용할 수 있습니다.

      #### 1. Windows

      [Git 다운로드 페이지](https://git-scm.com/download/win)에서 설치 파일을 받고 실행합니다. 보통 Next를 계속 눌러도 무방하나, 다소 유의해야 하는 설정 항목은 다음과 같습니다.[^1]

      1. **설치 항목 선택**: **Git LFS**는 Unity 프로젝트에 매우 적합하여 설치를 추천합니다.
      2. **기본 에디터 선택**: Unity에 연결한 개발 프로그램을 등록하면 좋습니다.

      {::options parse_block_html="true" /}
      {:red: style="color: crimson;"}
      {:blue: style="color: #4466b4;"}

      <button class="collapsible">
        **여기서 언급하는 사항은 초심자는 넘어가도 됩니다!**
      </button>

      <div class="collapsible-content">
        1. **`PATH` 환경변수 설정**: 다음의 3가지 선택지가 있습니다.

            - **Git Bash에서만 쓰기**: `PATH`를 수정하지 않아 Git Bash를 제외한 다른 프로그램에서 Git을 쓸 수 없습니다.
            - **다른 프로그램에서도 쓰기**{:blue}: `PATH`를 수정하여 CMD 등에서 `git` 명령어를 쓸 수 있게 합니다. Visual Studio를 비롯하여 많은 개발 툴이 Git과 연동되기 때문에, 가장 추천되는 기본 선택지입니다.
            - **Unix 툴도 같이 쓰기**{:red}: `PATH`에 Unix에서 쓰이는 프로그램에 대한 경로도 추가합니다. 단, 기존 CMD 등에서 사용되는 커맨드의 일부를 덮어씌우기 때문에 일반적으로 추천되지 않습니다.

            설치 후에도 <code>PATH</code> 환경변수를 직접 수정하여 설정을 변경할 수 있습니다.

        2. **SSH 프로그램 설정**: [PUTTY](https://www.putty.org/) 등을 사용하는 경우, Git에 내장된 OpenSSH 기반 클라이언트를 대신하여 사용할 수 있습니다. Git에서 SSH 클라이언트는 원격 저장소 작업 등에 사용됩니다.

            별도의 프로그램을 지정하는 경우 `GIT_SSH`와 `SVN_SSH` 환경 변수를 수정하며, Git은 이 변수가 지정하는 실행 파일을 이용하게 됩니다. 변수가 존재하지 않는 경우, Git 내장 클라이언트를 사용하게 됩니다.
        3. **SSL/TLS 라이브러리 설정**: HTTPS 통신에서 인증서 유효성 검증에 쓰일 라이브러리를 선택합니다. 기본적으로는 OpenSSL을 사용하여 Git에 내장된 `ca-bundle.crt` 파일을 허용된 인증 기관 목록으로 취급합니다. 옵션을 통해 Windows 네이티브 보안 채널 라이브러리를 이용할 수도 있는데, 이 경우 기본적으로 Windows 인증서 저장소를 통해 인증서를 허용하며, 내부망을 통한 인증서 검증을 할 수도 있습니다.

            이 설정은 `git config [--global] http.sslBackend <value>`로 수정할 수 있습니다. `<value>`의 값은 `openssl`, `schannel` 중 하나입니다.

        4. **개행문자 설정**: 텍스트 파일의 개행 문자를 제어하는 방법을 설정합니다. 여기서 개행 문자가 문제되는 경우는 두 가지가 있습니다.

            1. Git에 의해 파일이 직접적으로 **수정**될 때 <small>(원격 저장소의 파일과 병합하거나, 다른 *브랜치*의 파일 상태를 가져오는 경우)</small>
            2. 파일의 상태를 Git이 **기록**할 때

            이 때 Git이 제공하는 옵션은 총 세 가지입니다.

            - 무조건 (1)에서는 Windows 스타일의 `CRLF`로, (2)에서는 Unix 스타일의 `LF`로 바꾸기
            - (1)에서는 있는 그대로 반영하고, (2)에서는 Unix 스타일의 `LF`로 바꾸기
            - (1)과 (2) 모두 있는 그대로 반영하기

            이는 `git config [--global] core.autocrlf <value>`로 수정할 수 있고, `<value>`는 위에서부터 `true`, `input`, `false`에 대응됩니다.

        5. **Git Bash 에뮬레이터 설정**: Git Bash의 기반이 되는 터미널을 지정합니다. 첫번째 옵션은 [MSYS2](https://www.msys2.org/)의 터미널인 [MinTTY](https://mintty.github.io/)를 사용하는 것이며, 두번째 옵션은 CMD를 사용하는 것입니다. 아래는 두 터미널의 차이점입니다.

            | 터미널 종류 | 크기 재설정 | 유니코드 지원 | 콘솔 프로그램 실행 방법 |
            |:-----------:|:-----------:|:-------------:|:-----------------------:|
            | MinTTY      | ✅         | ✅            | `winpty`를 거쳐야 함    |
            | CMD         | ❌         | 설정 필요     | 변화 없음               |

        6. **기타 옵션 설정**: 다음과 같은 추가 기능을 설정할 수 있습니다.

            - **파일 시스템 캐싱**: 파일 관련 정보를 캐싱하여 성능을 높입니다.
            - **Git Credential Manager**: SSH 통신에서 사용자 이름과 암호 등 인증 정보를 Windows 자격 증명 관리자에 저장하고 자동으로 입력해주는 기능을 추가합니다.
            - **심볼릭 링크**: Git 자체에서 심볼릭 링크와 유사한 기능을 하는 파일을 제어합니다. 그러나 Windows Vista 이후로 심볼릭 링크가 기본 기능이 되어 큰 의미는 없을 것으로 보입니다.

        7. **실험적 기능**: 다음과 같은 실험적 기능을 설정할 수 있습니다.

            - **실험적 대화식 `add`**: `git add`를 대화식으로 사용하는 방식을 변경합니다. 이는 기존보다 속도가 빠르지만, 안정성이 보장되지는 않았습니다.
      </div>

      *[LFS]: [Large File Support];&#013;대용량 파일 지원.

      **Git Bash**는 Linux에서 쓰이는 명령어를 Windows에서도 쓸 수 있게 만들어진 CMD같은 프로그램입니다. `git` 커맨드 예시는 **Linux를 기준으로 작성된 경우가 많으므로**, 충분한 이해가 없다면 Git Bash를 사용하는 것을 추천합니다.

      #### 2. OS X

      [Git 다운로드 페이지](https://git-scm.com/download/mac)에서 `.dmg` 파일을 받고 실행합니다. 이후 그 내부의 `.pkg` 파일을 실행하여 Git을 설치합니다. 별다른 설정 없이 계속 진행하여 설치해도 무방합니다.

      #### 3. Linux

      일반적으로 패키지 관리자를 통해 설치합니다. 예를 들어, **Ubuntu/Debian**의 경우 **`sudo apt-get install git`** 커맨드를 사용합니다. 그러나 배포판에 따라 커맨드가 달라질 수 있으므로 정확한 정보는 [여기서](https://git-scm.com/download/linux) 확인하시기 바랍니다.

      [^1]: Git-2.22.0-64-bit.exe 설치 파일 기준입니다. 달라진 점이 있다면 알려주세요!
---

{% assign question = page.questions[0] %}
{% include question.html content=question id="q1" %}

{% assign question = page.questions[1] %}
{% include question.html content=question %}

{% assign question = page.questions[2] %}
{% include question.html content=question %}
