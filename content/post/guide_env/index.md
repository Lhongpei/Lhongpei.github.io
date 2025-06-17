---
Title: Configure Your Server (Part II) -- Python Environment
Date: 2025-06-17  
Categories:
- Guide  
- LLM  
Commentable: true  
series: configure server
pager: true
---

_This guide will walk you through setting up a server or cluster for deep learning tasks, particularly for Large Language Models (LLMs). The content was originally documented in my `wolai` notes and is now shared here. Feel free to ask questions in the comments!_


## A Beginner's Guide to Anaconda: Installation and Essential Commands

Welcome to the world of data science\! If you're diving into Python for analytics, machine learning, or scientific computing, you'll quickly hear about **Anaconda**. It's an all-in-one platform that simplifies package management and environment deployment, letting you focus on your code instead of wrestling with dependencies.

This guide will walk you through installing Anaconda and mastering the essential commands to get you up and running. 🚀

### 1\. Installation

First, you need to download the installer for your operating system. While you can always go to the [official Anaconda website](https://www.anaconda.com/download), you can also download it directly from the command line on a Linux system.

Open your terminal and use `curl` to fetch the installer script.

```bash
# Fetches the Anaconda installer script
curl -O https://repo.anaconda.com/archive/Anaconda3-2024.10-1-Linux-x86_64.sh
```

Once the download is complete, run the script using `bash`.

```bash
# Runs the installer script
bash Anaconda3-2024.10-1-Linux-x86_64.sh
```

The installer will prompt you to review the license agreement and confirm the installation location. For most users, the default settings are fine.

Crucially, the installer will ask if you want to initialize Anaconda3 by running `conda init`. **You should say yes\!** This step automatically configures your shell (e.g., `.bashrc` file) so that `conda` commands are available every time you open a new terminal.

After the installation finishes, close and reopen your terminal for the changes to take effect. You should see `(base)` appear before your prompt, indicating that you are in Anaconda's default `base` environment.

-----

### 2\. Managing Environments

The single most powerful feature of Anaconda is **environment management**. An environment is an isolated directory containing a specific collection of packages and a specific Python version. This prevents conflicts where one project needs `pandas` version 1.5 and another needs version 2.0.

Here are the commands you'll use every day:

  * **Create a new environment:**

    ```bash
    # Creates an environment named 'my_project' with Python 3.9
    conda create -n my_project python=3.9
    ```

  * **Activate an environment:** Before you can use an environment, you must activate it.

    ```bash
    # Activate the environment
    conda activate my_project
    ```

    Your terminal prompt will change from `(base)` to `(my_project)`.

  * **Deactivate an environment:** To return to the base environment.

    ```bash
    # Deactivate the current environment
    conda deactivate
    ```

  * **List all environments:** See all the environments you've created.

    ```bash
    # Lists all conda environments on your system
    conda env list
    ```

  * **Remove an environment:** When you're done with a project, you can delete its environment to save space.

    ```bash
    # Removes the specified environment and all its packages
    conda remove -n my_project --all
    ```

-----

### 3\. Managing Packages

Anaconda makes installing complex data science libraries like NumPy, pandas, and Scikit-learn a breeze. It automatically handles all the underlying dependencies for you.

  * **Install packages:** Install one or more packages into the currently active environment.

    ```bash
    # First, make sure you are in the correct environment
    conda activate my_project

    # Install packages from the default anaconda channel
    conda install numpy pandas matplotlib scikit-learn
    ```

  * **List installed packages:** See what's installed in your active environment.

    ```bash
    conda list
    ```

  * **Update packages:** Keep your packages up-to-date.

    ```bash
    # Update a specific package
    conda update pandas

    # Update all packages in the environment
    conda update --all
    ```

  * **Remove a package:**

    ```bash
    conda remove matplotlib
    ```

-----

### 4\. Pro Tip: Speed Up Downloads with a Mirror

Sometimes, downloading packages from the default repositories can be slow depending on your location. You can configure `conda` and its companion package manager, `pip`, to use a faster regional mirror.

For example, to use the Tsinghua University mirror in China, you can set the configuration for `pip` (which `conda` often uses as a fallback).

```bash
# Sets the default package download URL for pip to a faster mirror
pip config set global.index-url https://mirrors.tuna.tsinghua.edu.cn/pypi/web/simple
```

This tells `pip` to fetch packages from the specified mirror, which can result in significantly faster downloads.
