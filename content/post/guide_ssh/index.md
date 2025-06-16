---
Title: Setting Up Your Server/Cluster for Deep Learning and LLMs (Part I)  
Date: 2025-06-16  
Categories:
- Guide  
- LLM  
Commentable: true  
series:
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

---

The first part ends and the next section will be about configuring python environment, which is the fundation of deep learning (LLMs) tasks.