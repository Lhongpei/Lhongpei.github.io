---
Title: Configure Your Server (Part I) -- SSH and Git
Date: 2025-06-16  
Categories:
- Guide  
- LLM  
Commentable: true  
series: configure server
pager: true
---

_This blog is a work in progress. Feel free to ask questions in the comments!_  

This guide will walk you through setting up a server or cluster for deep learning tasks, particularly for Large Language Models (LLMs). The content was originally documented in my `wolai` notes and is now shared here.  


## **Prerequisites**  
Before starting, ensure you have:  
1. The server IP address (e.g., `111.111.111.111`) and login credentials from your administrator.  
2. Terminal access (Linux/macOS) or an SSH client (e.g., PuTTY for Windows).  


## Configure SSH for Password-Free Login
Repeatedly entering passwords is tedious. Here’s how to set up SSH key-based authentication:  

### **1. Generate an SSH Key Pair**  
Run the following in your **local machine’s terminal**:  
```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```  
- Press `Enter` to accept the default file location (`~/.ssh/id_rsa`).  
- Optional: Add a passphrase for extra security.  

### **2. Copy the Public Key**  
Display and copy your public key (`id_rsa.pub`):  
```bash
cat ~/.ssh/id_rsa.pub
```  
*Note:* If you used a custom key name, replace `id_rsa.pub` with your filename.  


### 3. Configure the Server

Connect to the server and add your public key: 

```bash
ssh your_username@111.111.111.111
mkdir -p ~/.ssh 
echo "YOUR_PUBLIC_KEY" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys  
```  
Notice that the last step, which restricts the file permission, will be important, because the system will not accept it with a open permission.

**Verify the setup**:  

```bash
ssh your_username@111.111.111.111 
```  

You should now be able to login without a password.

## Simplify Access with SSH Config 
Edit (or create) `~/.ssh/config` on your **local machine** to streamline logins:  
```bash
Host llm_server
    HostName 111.111.111.111 
    User your_username
    IdentityFile ~/.ssh/id_rsa 
```  

**Usage**:  

```bash
ssh llm_server  
```  

This will be convenient for using!

##  Connect with VS Code (Optional)

1. Install the **Remote - SSH** extension in VS Code.  
2. Press `F1` > **Remote-SSH: Connect to Host** > Select `llm_server`.  

This process is same for `Cursor`.

## Configure to use Github/Git

If you want use github to manage your repository, then you can follow this part to configure it.


### Configure Git

1. Install Git from this [website](https://git-scm.com/) and use `git --version` to validate.
2. Configure user's information by
    ```
    git config --global user.name "Your Name"
    git config --global user.email "your@email.com"
    ```


### SSH connection


1. Copy your public key as before `cat ~/.ssh/id_rsa.pub`.
2. Add it to Github.
   1. Navigate to Settings > SSH and GPG keys
   2. Click “New SSH key”, then paste the copied content

Then you can use this command to test SSH connection.

```
ssh -T git@github.com
```

### Usage

#### Vscode

1. **Open VS Code**
2. Click the **"Accounts"** icon in the lower-left corner (or your avatar in the bottom-right corner)
3. Select **"Sign in with GitHub"**
4. Authorize the login in your browser when prompted
5. Wait for VS Code to automatically configure your GitHub account connection

Then you can use UI in vscode to use Git.

#### Terminal

For easy usage, I list common git command here:

---

🧱 Initialization & Configuration

| Purpose               | Command                                            |
| --------------------- | -------------------------------------------------- |
| Initialize a Git repo | `git init`                                         |
| Set global username   | `git config --global user.name "Your Name"`        |
| Set global email      | `git config --global user.email "you@example.com"` |
| View current config   | `git config --list`                                |

---

🔗 Remote Repositories

| Purpose             | Command                                              |
| ------------------- | ---------------------------------------------------- |
| Add a remote origin | `git remote add origin git@github.com:user/repo.git` |
| View remote URLs    | `git remote -v`                                      |
| Change remote URL   | `git remote set-url origin NEW_URL`                  |

---

📥 Clone / Pull / Sync

| Purpose              | Command                                  |
| -------------------- | ---------------------------------------- |
| Clone a repository   | `git clone git@github.com:user/repo.git` |
| Pull latest changes  | `git pull`                               |
| Pull specific branch | `git pull origin branch-name`            |

---

📤 Add, Commit & Push

| Purpose              | Command                        |
| -------------------- | ------------------------------ |
| Stage a file         | `git add filename`             |
| Stage all changes    | `git add .`                    |
| Commit changes       | `git commit -m "Your message"` |
| Push to remote       | `git push`                     |
| Push specific branch | `git push origin branch-name`  |

---

🌿 Branch Management

| Purpose                  | Command                       |
| ------------------------ | ----------------------------- |
| List all branches        | `git branch`                  |
| Create a new branch      | `git branch branch-name`      |
| Switch to a branch       | `git checkout branch-name`    |
| Create and switch branch | `git checkout -b branch-name` |
| Merge a branch           | `git merge branch-name`       |
| Delete a branch          | `git branch -d branch-name`   |

---

📜 Status & Log

| Purpose             | Command                     |
| ------------------- | --------------------------- |
| View current status | `git status`                |
| View commit history | `git log`                   |
| Compact graph log   | `git log --oneline --graph` |

---

🛠️ Undo / Restore

| Purpose                            | Command                    |
| ---------------------------------- | -------------------------- |
| Unstage a file                     | `git reset HEAD filename`  |
| Discard changes in a file          | `git checkout -- filename` |
| Undo last commit (keep changes)    | `git reset --soft HEAD^`   |
| Undo last commit (discard changes) | `git reset --hard HEAD^`   |

---

📦 Tagging

| Purpose       | Command                  |
| ------------- | ------------------------ |
| Create a tag  | `git tag v1.0`           |
| List tags     | `git tag`                |
| Push a tag    | `git push origin v1.0`   |
| Push all tags | `git push origin --tags` |

---

🧪 Diffs & Comparison

| Purpose                                      | Command                    |
| -------------------------------------------- | -------------------------- |
| Compare working directory and staged changes | `git diff`                 |
| Compare staged and last commit               | `git diff --cached`        |
| Compare two commits                          | `git diff commit1 commit2` |

---

The first part ends and the next section will be about configuring python environment, which is the fundation of deep learning (LLMs) tasks.