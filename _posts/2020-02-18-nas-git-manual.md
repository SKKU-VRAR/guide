---
layout: post
title: 동아리방 NAS의 Git 서버 사용법
description: 동아리방 NAS의 Git 서버에 접속하는 법과 remote를 관리하는 법을 알아봅시다.
categories: git git-remote NAS 깃 나스
by: Orb_H (한종렬)
icon: nas-git-icon.svg
questions:
  - question: NAS가 뭔가요?
    answer: |-

      {:Broken: style="color: red;"}

      #### [NAS 서버 사용법](../nas-server){:Broken}(추가 예정) 문서를 참조해주세요.
      [//]: <> (NAS 서버 사용법 문서가 생길 경우 링크 이름은 포스트 이름, 주소는 올바른 주소, `Broken` style은 제거해주세요. 위의 `Broken` style도 같이 제거하면 됩니다.)

  - question: Git은 뭔가요?
    answer: |-

      #### [Git과 Github에 대하여](../about-git-n-github) 문서를 참조해주세요.

  - question: NAS의 Git 서버에 어떻게 연결하나요?
    answer: |-

      운영체제에 따라 조금씩 다릅니다.

      **아직 서버 컴퓨터에 계정 작업이 완료되지 않아 이 튜토리얼을 <u>진행할 수 없는 상태</u>입니다. 완료되는대로 이 메시지를 삭제할 예정입니다. 이 메시지가 삭제되었다면 튜토리얼을 진행해도 좋습니다. 다만, 만약 서버 컴퓨터에 본인의 계정이 있다면 서버 컴퓨터에 로그인하는 계정 이름인 git-skkuvr을 <u>본인의 계정 이름으로 치환해서 진행</u>할 수 있습니다.**
      
      [//]: <> (위의 메시지는 아직 서버 컴퓨터에 git-skkuvr 계정 생성 및 게스트 group ID 부여 작업이 되지 않았기 때문에 존재하는 메시지입니다. git-skkuvr 계정이 서버 컴퓨터에 생성되었다면 위 메시지를 삭제해주세요.)

      Git이 설치되어있나요? 터미널, cmd, 또는 git bash에서 `git --version` 명령어를 이용하여 Git이 설치가 되어있는지 확인하세요. 올바른 Git 버전이 나온다면 설치가 된 것입니다. 그렇지 않다면 [Git과 Github에 대하여](../about-git-n-github) 문서를 참조하여 Git을 설치하고나서 아래의 내용을 진행해주세요.

      #### 1. LogMeIn Hamachi 설치

      - **Windows / MAC / Linux(GUI)**

        [Hamachi 다운로드 페이지](https://www.vpn.net/)에서 Hamachi 설치 파일을 다운로드받을 수 있습니다. 위 링크에 들어가면 사이트 중앙에 Download now 버튼이 존재합니다. 이 버튼을 누르면 운영체제에 따라 설치 파일을 다운로드할 수 있습니다[^1] [^2]. 파일을 다운로드받은 후 설치 마법사의 지시에 따라 설치하면 Hamachi를 실행할 수 있습니다.

      - **Linux(쉘)**

        이 내용은 **[Hamachi 사용자 가이드 문서](https://documentation.logmein.com/documentation/EN/pdf/Hamachi/LogMeIn_Hamachi_UserGuide.pdf)**에서 관련 내용을 발췌했습니다. 이 링크를 통해 Hamachi에 관련된 많은 정보를 얻을 수 있습니다.

        - 먼저 설치 파일을 다운로드받습니다. `wget`을 사용합니다.

          - Ubuntu: `wget http://www.vpn.net/installers/logmein-hamachi_2.1.0.165-1_amd64.deb`
          - CentOS: `wget http://www.vpn.net/installers/logmein-hamachi-2.1.0.156-1.x86_4.rpm`

        - 다운로드받은 설치 파일을 이용하여 컴퓨터에 Hamachi를 설치합니다.

          - Ubuntu: `sudo dpkg -i logmein-hamachi_2.1.0.165-1_amd64.deb`
          - CentOS: `sudo yum install logmein-hamachi-2.1.0.165-1.x86_4.rpm`

      #### 2. Hamachi 실행 및 동아리방 서버와 연결

      앞서 설치한 Hamachi를 실행합니다.

      - <a name="windows-hamachi"></a>**Windows + Other Hamachi GUI**

        다른 버전의 Hamachi와 Windows 버전의 Hamachi의 UI가 유사하므로 Windows 기준으로 설명하겠습니다.

        먼저 Hamachi를 실행하면 아래의 그림과 같은 상태가 됩니다.

        ![Hamachi First Screen](../assets/img/nas-git-manual-hamachi.png)

        전원 버튼을 눌러 Hamachi 서비스를 실행시키고, **기존 네트워크에 가입** 버튼을 누릅니다. 그러면 네트워크의 아이디와 비밀번호를 입력하는 창이 아래와 같이 나옵니다. 메뉴 바의 `네트워크 -> 기존 네트워크에 가입` 메뉴를 사용해도 됩니다.

        ![Network Registration](../assets/img/nas-git-manual-net-reg.png)

        위의 그림과 같이 네트워크 아이디에는 skkuvr_git1, 비밀번호는 동아리 내부 공용 비밀번호를 사용합니다. 입력한 후 가입 버튼을 누르면 네트워크 목록에 skkuvr_git1 네트워크가 생긴 것을 볼 수 있습니다. 이제 집에 있는 컴퓨터에서 동아리방에 있는 서버용 컴퓨터에 접근을 할 수 있게 되었습니다.

        만약 skkuvr_git1 네트워크에 참가할 자리가 없다는 메시지가 나오는 경우 네트워크 이름의 1을 2, 3 ... 등으로 바꿔서 다시 시도해보세요. 자세한 내용은 [네트워크에 참가할 자리가 없다는 메시지가 나오는 경우](#full-network)를 참조하세요.

      - **Linux(쉘)**

        Hamachi를 설치한 이후 아래의 명령어를 이용하여 Hamachi가 정상적으로 설치되었는지, Hamachi 서비스가 정상적으로 실행되는지 확인합니다.

        ```
        $ sudo service logmein-hamachi status
        ```

        이 명령어의 출력값으로 아래와 같은 문구가 나온다면 Hamachi가 정상적으로 실행되고 있는 상태입니다.

        ```
        ● logmein-hamachi.service - LSB: Start/stop logmein-hamachi engine
          Loaded: loaded (/etc/init.d/logmein-hamachi; generated)
          Active: active (running)
          ....
        ```

        만약 서비스를 찾을 수 없다는 문구가 나온다면 Hamachi가 설치되지 않은 것입니다. 이런 경우 설치 과정을 다시 진행합니다. 만약 서비스가 켜져있지 않은 경우는 3번째 줄의 Active 항목의 값이 `stopped` 등과 같은 값을 가지게 됩니다. 그런 경우에는 아래의 명령어를 입력합니다.

        ```
        $ sudo service logmein-hamachi start
        ```

        이제 아래의 명령어로 Hamachi에 로그인을 합니다. 처음 실행했을 때만 로그인하면 됩니다.

        ```
        $ sudo hamachi login
        ```
        
        이제 네트워크에 참가할 차례입니다. 아래의 명령어로 skkuvr_git1 네트워크에 참가합니다. 만약 비밀번호 입력 창이 뜨지 않고 네트워크에 참가할 수 있는 자리가 없다는 식의 문구가 나온다면 네트워크 이름의 1을 2, 3, ... 등으로 바꿔서 다시 시도해보세요. 자세한 내용은 [네트워크에 참가할 자리가 없다는 메시지가 나오는 경우](#full-network)를 참조하세요.

        ```
        $ sudo hamachi join skkuvr_git1
        Password: (비밀번호)
        ```

        컴퓨터의 Hamachi가 어떤 네트워크에 연결되어있는지 확인하려면 아래의 명령어를 입력합니다.

        ```
        $ sudo hamachi list
        ```

        표시된 네트워크 목록에 앞서 참가한 네트워크가 존재하는지 확인합니다. 만약 있다면, 이제 서버 컴퓨터와 통신을 할 수 있게 된 것입니다.
      
      - <a name="full-network"></a>**네트워크에 참가할 자리가 없다는 메시지가 나오는 경우**

        Hamachi의 한 네트워크는 호스트 포함 5명까지 연결이 가능합니다. 하지만 동아리원의 수는 이보다 훨씬 많기 때문에 여러 네트워크를 호스트하여 더 많은 인원을 수용할 수 있도록 하고 있습니다. 위의 튜토리얼에서는 skkuvr_git1이라는 네트워크 이름으로 진행했는데, 이 네트워크 이외에도 skkuvr_git2, skkuvr_git3, skkuvr_git4, skkuvr_git5 네트워크가 존재합니다(부족할 경우 더 추가될 수 있습니다). 만약 skkuvr_git1 네트워크에 참가할 자리가 없다면 다른 네트워크에 접속을 시도해보세요. 네트워크 이름만 다르고 나머지 설정은 모두 같습니다.

        ![Hamachi Servers](../assets/img/nas-git-manual-servers.png)

      #### 3. SSH Config 파일 수정

      먼저 SSH Config 파일을 찾아야합니다. 해당 파일의 위치는 운영체제마다 조금씩 다릅니다.

      - **Windows**: `%HOMEPATH%/.ssh/config`[^3]
      - **Mac, Linux**: `~/.ssh/config`

      해당 파일을 찾았다면 텍스트 에디터를 이용하여 열어줍니다. 파일 끝에 아래의 내용을 추가합니다.

      ```
      Host (적당한 문자열)
        HostName 192.168.yyy.yyy
        ProxyCommand ssh git-skkuvr@xxx.xxx.xxx.xxx nc %h %p
      ```

      적당한 문자열은 띄어쓰기가 없어야 합니다. `git-vr.skku.edu`와 같이 존재하지 않는 적당한 도메인(스러운 문자열)으로 하는 것이 좋습니다. 또한, xxx.xxx.xxx.xxx는 Hamachi 상 admin-skkuvr 노드의 IP주소, 192.168.yyy.yyy는 동아리 내부 네트워크에서의 NAS 서버의 IP입니다. 보안 상 IP를 문서에는 명시하지 않았지만, 동아리 단톡방이나 디스코드에 물어보면 알려줄 것입니다.
      
      저의 경우는 아래와 같이 작성해서 사용합니다.

      ```
      Host git-vr.skku.edu
        HostName 192.168.yyy.yyy
        ProxyCommand ssh git-skkuvr@xxx.xxx.xxx.xxx nc %h %p
      ```

      IP 주소 앞에 붙은 `git-skkuvr@`은 xxx.xxx.xxx.xxx에 접속할 때에 사용자 이름을 git-skkuvr로 해서 접속을 시도하겠다는 의미입니다. config 파일에 해당 내용을 추가했다면, 이제 테스트를 해봅시다. cmd 또는 shell에 아래의 커맨드를 입력합니다.

      ```
      $ ssh git-vr.skku.edu -l git-skkuvr
      git-skkuvr@xxx.xxx.xxx.xxx's password: (비밀번호 입력)
      git-skkuvr@192.168.yyy.yyy's password: (비밀번호 입력)
      git-skkuvr@nas-skkuvr:~$
      ```

      만약 2번째 줄과 같이 비밀번호를 입력하라는 문구가 나오지 않고 `Connection Timed Out`이나 `Unknown Host`가 나온다면 Hamachi 설정이 잘못되어있거나 계정이 잘못 설정되어있는 경우입니다. Hamachi가 켜져있는지, Hamachi에서 올바른 네트워크에 참가했는지, 그리고 SSH Config를 올바르게 작성했는지 다시 한 번 확인해보시기 바랍니다.

      이제 동아리방의 NAS와 SSH 연결을 수립할 수 있게 되었습니다! 또한 git 서버도 사용할 수 있습니다. 아래와 같이 git clone을 하면 NAS에 존재하는 repo를 clone할 수 있습니다.

      ```
      $ git clone ssh://git-skkuvr@git-vr.skku.edu/volume1/Git/(repo name)
      Cloning into '(repo name)'...
      git-skkuvr@xxx.xxx.xxx.xxx's password: (비밀번호 입력)
      git-skkuvr@192.168.yyy.yyy's password: (비밀번호 입력)
      remote: Enumerating objects: nnn, Done.
      ....
      ```

      이 상태에서 git remote 명령어로 현재 remote 상태를 보면 Github가 아닌 `git-vr.skku.edu`, 즉, NAS로 되어있다는 것을 확인할 수 있습니다.

      ```
      $ git remote -v
      origin  ssh://git-skkuvr@git-vr.skku.edu/volume1/Git/(repo name) (fetch)
      origin  ssh://git-skkuvr@git-vr.skku.edu/volume1/Git/(repo name) (push)
      ```

      [^1]: 혹시 자신의 운영체제에 맞지 않는 설치 파일(또는 링크)이 주어진다면, 버튼 아래의 링크를 통해서 자신의 운영체제에 맞는 설치 파일을 고를 수 있습니다.
      [^2]: Linux의 경우 쉘에서 작동하는 Hamachi가 설치됩니다. command가 불편한 경우에는 Hamachi 설치 후 [Haguichi](https://www.haguichi.net/download/)를 설치해서 GUI로 하마치를 관리할 수 있습니다. Haguichi는 Windows나 MAC 버전의 Hamachi와 UI가 유사하기 때문에 Haguichi를 어떻게 사용하는지에 대한 설명은 [Windows + Other Hamachi GUI 사용법](#windows-hamachi)을 참조해주세요.
      [^3]: 보통 %HOMEPATH%는 `C:\Users\(user name)`입니다.
  
  - question: NAS에 새로운 repo는 어떻게 만드나요?
    answer: |-

      #### 아직 방법은 없습니다.

      repo 생성은 git 서버가 해줄 수 있는 내용이 아닙니다. git repo 생성은 폴더를 하나 만들고, 그 폴더 안에서 `git --bare init` 커맨드를 이용하여 원격 저장소로 사용함을 git 서버 프로그램에 알려야 합니다. 그 이후 일반 사용자가 git 명령어를 이용하여 접근할 수 있게 됩니다. 이 이슈에 대해 많은 고민을 했었는데요, 마치 Github처럼 NAS에 있는 git 서버를 위한 웹 페이지를 만들까 합니다. 사이트가 생성되면 이 내용은 사이트에서 repo를 만드는 방법, 그 외에도 사이트에서 할 수 있는 것에 대한 내용으로 채워질 예정입니다.

  - question: NAS에서 clone한 repo는 NAS에서만 작업해야하나요?
    answer: |-

      #### 그렇지 않습니다. remote를 관리하면 여러 곳에 작업이 가능합니다.

      - **원격 저장소**

        git은 보통 2개의 저장소로 나뉘어져 있습니다. **로컬 저장소**와 **원격 저장소(리모트 저장소)**입니다. 로컬 저장소는 말 그대로 작업을 진행하고 있는 컴퓨터에 있는, 본인의 컴퓨터에 있는 저장소를 의미합니다. 개인적으로 사용할 용도인 저장소죠. 반대로 원격 저장소는 remote라는 단어의 뜻인 [외진, 외딴]처럼 떨어져있는 곳의 저장소를 의미합니다. 보통 인터넷, 네트워크를 통해 접속할 수 있는 저장소를 가리킵니다[^1]. 원격 저장소의 경우는 공용으로 사용할 용도로 사용됩니다.
      
      - **git remote**

        git에는 `git remote`라는 명령어가 있습니다. git의 원격 저장소 목록을 관리할 수 있는 명령어입니다. 먼저 cmd, git bash, sh와 같은 쉘에서 로컬 저장소로 이동합니다.

        - remote 목록 확인
        
          다음 아래 명령어를 이용하여 어떤 remote를 확인합니다.

          ```
          $ git remote
          origin
          ```

          Github으로 작업하는 저장소의 경우 보통 위와 같이 origin 하나만 존재합니다. 원격 저장소의 조금 더 자세한 정보를 확인하려면 아래의 명령어를 입력합니다.

          ```
          $ git remote -v
          origin  https://github.com/username/reponame (fetch)
          origin  https://github.com/username/reponame (push)
          ```

          출력되는 원격 저장소 주소 중 첫 번째(fetch)는 원격 저장소와 로컬 저장소와 비교하여 로컬 저장소의 변경 내역 이후로 원격 저장소에 추가적인 변경 내역이 있는지 확인(fetch)할 주소입니다. 두 번째(push)는 반대로 두 저장소를 비교하여 원격 저장소의 변경 내역 이후로 로컬 저장소에 추가적인 변경 내역이 존재하는 경우 이를 원격 저장소에 반영(push)시킬 주소입니다[^2].
        
        - remote 추가

          이제 여기에 새로운 remote를 추가해보겠습니다. NAS git 서버 관련 문서이니 NAS git 서버에 존재하는 테스트용 빈 repo 주소를 예시로 사용하겠습니다. 아래 명령어를 이용하여 새로운 remote를 추가하겠습니다.

          ```
          $ git remote add vr ssh://git-skkuvr@git-vr.skku.edu/volume1/Git/test.git
          ```

          이제 다시 remote 목록을 확인해보면 vr이라는 remote가 생겼음을 알 수 있습니다.

          ```
          $ git remote -v
          origin  https://github.com/username/reponame (fetch)
          origin  https://github.com/username/reponame (push)
          vr      ssh://git-skkuvr@git-vr.skku.edu/volume1/Git/test.git (fetch)
          vr      ssh://git-skkuvr@git-vr.skku.edu/volume1/Git/test.git (push)
          ```

        - remote 이름 수정

          이번에는 remote의 이름을 바꿔보겠습니다. 새로 추가한 remote의 이름을 vr에서 vr-nas로 바꾸도록 하겠습니다. 아래의 명령어를 이용하여 remote의 이름을 바꿉니다.

          ```
          $ git remote rename vr vr-nas
          ```

          다시 remote 목록을 확인해봅니다.

          ```
          $ git remote -v
          origin  https://github.com/username/reponame (fetch)
          origin  https://github.com/username/reponame (push)
          vr-nas  ssh://git-skkuvr@git-vr.skku.edu/volume1/Git/test.git (fetch)
          vr-nas  ssh://git-skkuvr@git-vr.skku.edu/volume1/Git/test.git (push)
          ```
        
        - remote 삭제

          이제 NAS git 서버의 repo를 더 이상 쓸 일이 없어 remote를 삭제한다고 가정해보겠습니다. 이 경우에는 아래의 명령어를 통해 remote 목록에서 vr-nas remote를 없앨 수 있습니다.

          ```
          $ git remote remove vr-nas
          ```

          다시 remote 목록을 확인해보면 처음 상태와 같아질 것입니다.

          ```
          $ git remote -v
          origin  https://github.com/username/reponame (fetch)
          origin  https://github.com/username/reponame (push)
          ```

          여기서 `git remote remove`를 이용하여 remote를 삭제한다고 해도 원격 저장소에 있는 repo에는 아무 영향도 가지 않습니다. 사용자가 작업하는 곳은 로컬 저장소이고 로컬 저장소에서 원격 저장소로 연결하는 길만 삭제한 것이기 때문이죠. 로컬 목록에서만 삭제한 것이기 때문에 git remote add를 이용해서 다시 remote 목록에 추가할 수 있습니다.

        우선 간단하게 remote의 정보를 보고, 추가하고, 이름을 수정하고, 삭제하는 방법에 대해 알아보았습니다. 이 명령어들 외에도 `git remote`에는 몇 가지의 커맨드가 더 있습니다. git remote 관련 커맨드 전체 목록은 아래와 같습니다.

        ```
        git remote [-v | --verbose]
        git remote add [-t <branch>] [-m <master>] [-f] [--[no-]tags] [--mirror=<fetch|push>] <name> <url>
        git remote rename <old> <new>
        git remote remove <name>
        git remote set-head <name> (-a | --auto | -d | --delete | <branch>)
        git remote set-branches [--add] <name> <branch>...
        git remote get-url [--push] [--all] <name>
        git remote set-url [--push] <name> <newurl> [<oldurl>]
        git remote set-url --add [--push] <name> <newurl>
        git remote set-url --delete [--push] <name> <url>
        git remote [-v | --verbose] show [-n] <name>...
        git remote prune [-n | --dry-run] <name>...
        git remote [-v | --verbose] update [-p | --prune] [(<group> | <remote>)...]
        ```

        모든 커맨드에 대한 설명은 [git 공식 홈페이지 문서](https://git-scm.com/docs/git-remote)(영어)에서 볼 수 있습니다.

      - 여러 remote에 git 사용하기

        이제 remote를 관리할 줄 알게 되었으니 이 remote에 git 작업을 알아보겠습니다. 사실 어렵지 않고 이미 알고 있을 수도 있습니다.

        - push
      
          git push의 사용법은 아래와 같습니다.

          ```
          git push <remote> <branch>
          ```

          remote 자리에 remote 이름, branch 자리에 branch 이름을 쓰면 됩니다. 아래와 같이 말이죠.

          ```
          $ git push vr-nas test
          ```
        
        - fetch / pull

          git fetch의 사용법은 아래와 같습니다.

          ```
          git fetch <remote>
          ```

          아래와 같이 remote 자리에 remote 이름을 쓰면 됩니다.

          ```
          $ git fetch vr-nas
          ```

          git pull은 git fetch와 git merge를 연달아 실행하는 것과 같은 역할을 합니다. 보통 `git fetch <remote>` 후 `git merge <remote> <branch>`를 실행하는 것을 권장합니다만, 아래의 방법으로 git pull을 사용할 수 있습니다.

          ```
          git pull <remote> <branch>
          ```
      
      [^1]: 경우에 따라 로컬 저장소와 같은 위치에 원격 저장소가 위치할 수도 있습니다.
      [^2]: 일반적인 경우는 한 remote 이름에 fetch 주소와 push 주소가 같지만, 반드시 같아야 하는 것은 아닙니다. 하지만 같은 곳을 가리켜야 합니다. `git push` 작업은 push 주소에 지정된 원격 저장소에 변경 내역을 전송하고 그와 동시에 fetch 주소로 지정된 원격 저장소로부터 fetch 작업이 일어나기 때문입니다.

  - question: 그러면 왜 Github가 있는데도 NAS를 사용하는건가요?
    answer: |-

      #### Github은 repo의 용량 문제가 있더군요...

      사실 이 문제가 가장 큽니다. 다른 프로젝트는 용량이 크지 않은데 비해 게임 개발(또는 그와 비슷한 프로젝트)의 경우 여러 리소스를 필요로 합니다. 그렇기 때문에 코드를 많이 쓰지 않더라도 수 백 MB의 용량을 차지하죠. 하지만 Github의 한 repo의 크기는 200MB의 제한이 걸려있고, 이 제한을 우회하는 방법인 Git LFS도 용량 1GB와 대역폭 1GB의 제한이 걸려있습니다. 따라서 용량과 대역폭의 제한이 없는 또 다른 Git을 사용할 필요가 생겼습니다.
  
  - question: 이 시스템을 왜 구상하고 구축하셨나요?
    answer: |-

      #### 그러게나 말입니다. 

      **아래 답변은 신세 한탄에 가깝습니다.**

      저희 동아리는 2019년도에 프로젝트 2개를 진행했는데, 이 문서의 작성자인 [저](https://github.com/Orb-H)는 CastleDefense라는 프로젝트를 진행했습니다. 저는 2019년도 2학기 AG가 되면서 동아리 규칙에 따라 프로젝트에 참여하게 되었습니다. 작업을 하기 위해 Github에서 프로젝트 repo를 받아왔습니다. 그런데 하필이면 제가 코드와 이미지를 추가하자마자 용량 문제로 `git push`가 되지 않았습니다. 이에 대한 해법으로 Git LFS를 사용할 수 있다는 프로젝트 구성원의 말에 Git LFS를 이용하여 애셋을 올리는 방법을 택했습니다. Github의 SKKU-VRAR 계정으로 LFS를 사용하려고 했으나 이미 이 계정으로는 LFS 용량과 대역폭이 다 차있어서 LFS 또한 사용할 수 없었습니다. 그런데 마침 동아리에서 NAS가 놀고있다는 소식을 들었습니다. 그런 김에 NAS에 Git 서버를 설치하는 방안을 생각해냈습니다. 동아리의 NAS는 Synology 사의 NAS였는데 마침 스토어에 무료로 Git Server를 제공하더군요. 이걸 바로 NAS에 설치해서 Git 서버를 열어서 프로젝트를 모두 옮겼습니다. 일단 Github 용량 관련 문제를 해결한 것이죠.

      이번엔 또 다른 문제가 생겼습니다. Git 서버가 인트라넷에 있다는 것이었죠. 곧 방학인데 매일 학교를 나올 수도 없는 노릇이라 동아리방 외부에서 NAS에 접속하는 방법이 필요했습니다. 이를 해결하기 위해 생각한 방안이 먼저 외부에서 SSH로 NAS에 접속할 수 있게 만든 다음, 그 경로로 Git을 가져오겠다는 것이었습니다. 먼저 SSH로 NAS에 접속시키기 위해 찾은 방안이 `ssh -t` 옵션이었습니다. `ssh -t server <command>`를 통해 tty를 열고 command를 지정할 수 있는데, 이 command로 ssh를 사용하면 SSH Tunneling과 비슷한 효과를 낼 수 있다고 하여 시도를 했고 SSH 연결에 성공했습니다. 그러나 문제가 하나 더 있었습니다. git remote 설정 시 일반적인 형식의 주소를 입력해야하는데, 이를 `-t xxx.xxx.xxx.xxx ssh yyy.yyy.yyy.yyy`와 같이 커맨드 형식으로는 집어넣지 못하는거죠. 그래서 이를 해결할 방안으로 SSH Config 파일을 건드려서 자동으로 프록시를 거치게 해주는 것을 검색할 수 있었습니다. 이 외에도 여러 가지 방법을 찾을 수 있었으나 SSH Config를 건드리는 방법이 가장 편해서 이를 사용하게 되었습니다. 위의 경우는 .ssh 폴더 아래의 config 파일에 ProxyCommand를 추가하여 해결할 수 있었고, 2020년 2월 12일 외부에서 정상적으로 SSH 연결 및 `git clone`, `git pull` 및 `git push`가 작동하는 것을 확인하였습니다. 이제 인트라넷 문제까지 해결이 되어 외부에서도 NAS git 서버를 통해 git을 사용할 수 있게 되었습니다.
      
      그런데 또 생각해보니 새로운 repository를 생성하는 것이 수동입니다. 즉, NAS에 SSH 연결을 하고 repository 역할을 할 폴더를 생성하고 init을 하는게 필요한데, 이를 직접 건드릴 용자는 없을 것이라 생각해서 git만을 가지고 할 수 없는 git 관련 동작들을 수행시킬 수 있는 웹 페이지를 현재 프록시 역할을 하는 컴퓨터에 올리려고 합니다. 이걸 만들 생각을 하니 벌써부터 두근두근거려서 고혈압으로 죽어버릴 것 같네요.
---

{% assign question = page.questions[0] %}
{% include question.html content=question %}

{% assign question = page.questions[1] %}
{% include question.html content=question %}

{% assign question = page.questions[2] %}
{% include question.html content=question %}

{% assign question = page.questions[3] %}
{% include question.html content=question %}

{% assign question = page.questions[4] %}
{% include question.html content=question %}

{% assign question = page.questions[5] %}
{% include question.html content=question %}

{% assign question = page.questions[6] %}
{% include question.html content=question %}
