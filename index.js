// ==UserScript==
// @name         GitHub to DeepWiki Link
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  在GitHub仓库页面的stars、fork区域旁边添加美化的跳转到DeepWiki的链接
// @author       You
// @match        https://github.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 主函数，添加DeepWiki链接
    function addDeepWikiLink() {
        // 首先检查是否在一个GitHub仓库页面
        const repoInfo = getRepositoryInfo();
        if (!repoInfo) return;

        // 创建DeepWiki链接
        const deepWikiUrl = `https://deepwiki.com/${repoInfo.owner}/${repoInfo.repo}`;
        
        // 添加自定义CSS样式到页面
        addCustomCSS();
        
        // 寻找 stars、fork 区域
        const actionsBar = findActionsBar();
        if (!actionsBar) return;
        
        // 检查是否已经添加了链接（避免重复添加）
        if (document.getElementById('deepwiki-button')) return;
        
        // 创建DeepWiki按钮
        const deepWikiButton = createDeepWikiButton(deepWikiUrl);
        
        // 插入按钮到适当位置
        insertDeepWikiButton(actionsBar, deepWikiButton);
    }

    // 查找仓库操作栏（stars、fork等按钮所在区域）
    function findActionsBar() {
        // 尝试多种选择器以适应GitHub可能的布局变化
        const selectors = [
            'ul.pagehead-actions',
            '.gh-header-actions',
            '.repository-content .file-navigation',
            '.repository-content .d-flex'
        ];
        
        for (const selector of selectors) {
            const element = document.querySelector(selector);
            if (element) return element;
        }
        
        // 备用方法：查找包含 star、fork 按钮的容器
        const starButton = document.querySelector('a[aria-label*="star this"]');
        if (starButton) {
            const parent = starButton.closest('ul') || starButton.closest('div');
            if (parent) return parent;
        }
        
        return null;
    }

    // 创建DeepWiki按钮元素
    function createDeepWikiButton(url) {
        // 创建按钮容器，类似于GitHub的其他操作按钮
        const container = document.createElement('li');
        container.className = 'ml-3 d-flex';
        container.id = 'deepwiki-button-container';
        
        // 创建按钮链接
        const link = document.createElement('a');
        link.id = 'deepwiki-button';
        link.href = url;
        link.target = '_blank';
        link.className = 'btn btn-sm';
        link.style.display = 'inline-flex';
        link.style.alignItems = 'center';
        link.style.justifyContent = 'center';
        link.style.position = 'relative';
        link.style.overflow = 'hidden';
        link.style.background = 'linear-gradient(to right, #0366d650, #2ea44f50)';
        link.style.border = '1px solid rgba(27, 31, 35, 0.15)';
        link.style.transition = 'all 0.2s ease';
        
        // 为按钮添加悬停和点击效果
        link.addEventListener('mouseover', () => {
            link.style.background = 'linear-gradient(to right, #0366d680, #2ea44f80)';
            link.style.borderColor = 'rgba(27, 31, 35, 0.3)';
        });
        
        link.addEventListener('mouseout', () => {
            link.style.background = 'linear-gradient(to right, #0366d650, #2ea44f50)';
            link.style.borderColor = 'rgba(27, 31, 35, 0.15)';
        });
        
        link.addEventListener('mousedown', () => {
            link.style.transform = 'scale(0.97)';
        });
        
        link.addEventListener('mouseup', () => {
            link.style.transform = 'scale(1)';
        });
        
        // 设置按钮内容
        link.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style="margin-right: 6px;" class="deepwiki-icon">
                <path fill="currentColor" d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm-3 5v2h3.586L7.293 14.293l1.414 1.414L14 10.414V14h2V7H9z"/>
            </svg>
            <span>DeepWiki</span>
        `;
        
        container.appendChild(link);
        return container;
    }
    
    // 插入DeepWiki按钮到适当的位置
    function insertDeepWikiButton(actionsBar, button) {
        // 检查我们找到的元素是什么类型，并决定如何插入按钮
        if (actionsBar.tagName === 'UL') {
            // 如果是列表，尝试在合适的位置添加为列表项
            actionsBar.appendChild(button);
        } else {
            // 如果是其他容器，适当调整按钮样式并添加
            button.className = 'd-flex ml-2';
            actionsBar.appendChild(button);
        }
    }

    // 获取当前页面的仓库信息
    function getRepositoryInfo() {
        // 从URL中提取仓库信息
        const path = window.location.pathname.substring(1).split('/');
        if (path.length < 2) return null;
        
        return {
            owner: path[0],
            repo: path[1]
        };
    }

    // 添加自定义CSS到页面
    function addCustomCSS() {
        if (document.getElementById('deepwiki-styles')) return;
        
        const styleElement = document.createElement('style');
        styleElement.id = 'deepwiki-styles';
        styleElement.textContent = `
            #deepwiki-button::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 0;
                height: 2px;
                background-color: #0366d6;
                transition: width 0.3s ease;
            }
            
            #deepwiki-button:hover::after {
                width: 100%;
            }
            
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
            
            .deepwiki-icon {
                animation: pulse 2s infinite;
            }
        `;
        
        document.head.appendChild(styleElement);
    }

    // 监听页面变化（GitHub使用AJAX加载页面内容）
    function observePageChanges() {
        const observer = new MutationObserver(function(mutations) {
            // 如果没有找到按钮，尝试添加
            if (!document.getElementById('deepwiki-button')) {
                addDeepWikiLink();
            }
        });
        
        observer.observe(document.body, { childList: true, subtree: true });
        
        // 首次执行
        addDeepWikiLink();
    }

    // 当页面加载完成后开始监听
    window.addEventListener('load', observePageChanges);
    
    // 也可以在DOM加载完成后就执行一次
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addDeepWikiLink);
    } else {
        addDeepWikiLink();
    }
})();
