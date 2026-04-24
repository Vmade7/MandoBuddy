# **MandoBuddy Design Document**







## **1. Introduction**





**English:**

MandoBuddy is a beginner-friendly Chinese learning platform designed for overseas users. The platform provides a simple, engaging, and interactive way to start learning Chinese with a focus on pronunciation practice. In the 4-day MVP, we aim to implement key features, such as pronunciation practice, interactive quizzes, and progress tracking, all built with a smooth front-end user experience.



------





## **2. Features**







### **2.1 Frontend Core Experience**





**English:**



- **Responsive Layout:** The platform will support desktop, tablet, and mobile devices using a responsive design that adapts to different screen sizes.
- **Smooth Animations:** Button interactions, page transitions, and progress animations will be implemented with CSS and JS for a seamless user experience.
- **Local Storage Mechanism:** Learning progress, favorites, and incorrect answers will be stored locally using localStorage to minimize server dependency.







### **2.2 Core Learning Features**





**English:**



- **Pinyin Learning:** Interactive lessons on initials, finals, and tones with text, images, and pre-recorded audio clips for pronunciation practice.
- **Vocabulary Learning:** Flashcards featuring images, audio, English definitions, and example sentences for learning words in context.
- **Sentence Learning:** Short dialogues with audio and subtitles in both Chinese and English for practice.
- **Cultural Insights:** Light, fun cultural cards with English and Chinese text, allowing users to explore Chinese culture while learning.







### **2.3 Lightweight Feedback Mechanism**





**English:**



- **Quizzes:** Multiple-choice and fill-in-the-blank questions provide immediate feedback and simple explanations.
- **Error Collection:** Incorrect answers are stored in a personal error log, enabling users to review them at any time.
- **Progress Tracking:** A visual progress bar with completion badges rewards users for learning milestones.





------





## **3. UI/UX Design**







### **3.1 Visual & Interaction Design**





**English:**



- **Color Scheme:** Warm orange (#FF6B35) and fresh blue (#4ECDC4) create a friendly and professional feel.
- **Typography:** Use system fonts for English (like -apple-system, Segoe UI) for fast loading and Noto Sans SC for Chinese, focusing on readability.
- **Animation Design:** Interactive elements like buttons and page transitions will feature smooth animations to enhance engagement.







### **3.2 Learning Flow Design**





**English:**



- **3-Click Start:** Users can start a lesson with just 3 clicks: open the homepage, click “Try a Lesson,” and select the lesson.
- **No Interruptions:** After completing each section, the user is automatically scrolled to the next section with no manual intervention needed.
- **Feedback after Exercises:** Immediate feedback is provided after completing exercises, along with encouraging messages to keep the user motivated.





------





## **4. Backend Design**







### **4.1 API Development**





**English:**



- **FastAPI:** The backend will be built using FastAPI to handle audio file uploads and speech evaluation. It will also manage user progress and other basic data.
- **Error Handling:** The backend will include error handling for large files, API timeouts, and other potential issues to ensure a smooth user experience.







### **4.2 AI Integration**





**English:**



- **Azure Speech API:** The backend will integrate the Azure Speech API to evaluate pronunciation and return scores. This will provide real-time feedback to users on their speaking accuracy.





------





## **5. Deployment & Hosting**





**English:**



- **Frontend Deployment:** The frontend will be deployed on Vercel for easy and fast deployment with automatic updates via GitHub integration.
- **Backend Deployment:** The backend will be containerized using Docker and deployed to a cloud service for scalability and reliability.





------





## **6. Testing & QA**







### **6.1 Testing Strategy**





**English:**



- **Functional Testing:** We will test all core features, including recording, scoring, and progress tracking, to ensure they work as expected.
- **End-to-End Testing:** A full round of testing will be conducted to ensure all components work together seamlessly.







### **6.2 QA Plan**





**English:**



- **Bug Reporting:** Any issues found during testing will be reported and tracked using a task management tool.
- **Final Testing:** A final round of testing will be conducted on the deployed version to ensure it meets all performance and stability requirements.





------





# **MandoBuddy设计文档**







## **1. 项目介绍**





**中文:**

MandoBuddy 是一个为海外用户设计的中文学习平台，旨在提供一个简单、互动的中文入门学习方式，特别注重发音练习。在4天的MVP版本中，我们计划实现关键功能，如发音练习、互动测验和学习进度追踪，所有功能都将围绕流畅的前端用户体验构建。



------





## **2. 功能**







### **2.1 前端核心体验**





**中文:**



- **响应式布局：**平台将支持桌面、平板和移动设备，使用响应式设计适应不同屏幕尺寸。
- **流畅动效：**按钮交互、页面切换和进度动画将通过CSS和JS实现，提供无缝的用户体验。
- **本地存储机制：**学习进度、收藏和错题将使用localStorage本地存储，减少对服务器的依赖。







### **2.2 核心学习功能**





**中文:**



- **拼音学习：**通过图文和预录音频学习声母、韵母和声调，进行发音练习。
- **词汇学习：**包含图片、音频、英文释义和例句的场景卡片，帮助用户在语境中学习词汇。
- **句子学习：**带有中英字幕的短对话音频，帮助用户练习常用句子。
- **文化彩蛋：**轻松有趣的文化卡片，展示中英对照内容，帮助用户在学习中文的同时了解中国文化。







### **2.3 轻量反馈机制**





**中文:**



- **小测验：**选择题和填空题提供即时反馈和简单解析。
- **错题收集：**错误答案会存储在个人错题本中，用户可以随时复习。
- **进度追踪：**可视化进度条和完成徽章奖励用户在学习中的成就。





------





## **3. UI/UX设计**







### **3.1 视觉与交互设计**





**中文:**



- **色彩方案：**温暖的橙色（#FF6B35）和清新的蓝色（#4ECDC4）营造出友好且专业的氛围。
- **字体选择：**英文使用系统字体（如 -apple-system, Segoe UI），中文使用 Noto Sans SC，注重可读性。
- **动效设计：**按钮和页面切换等交互元素将采用流畅的动效设计，增强用户参与感。







### **3.2 学习流程设计**





**中文:**



- **三步启动：**用户只需三次点击即可开始学习：打开首页、点击“尝试一课”、选择课程。
- **无阻断学习：**完成每节课程后，用户会自动滑动到下一节，无需手动操作。
- **练习后的反馈：**完成练习后，用户会收到即时反馈和鼓励语句，帮助用户保持动力。





------





## **4. 后端设计**







### **4.1 API开发**





**中文:**



- **FastAPI：**后端将使用FastAPI开发，处理音频文件上传和语音评估，同时管理用户进度和其他基本数据。
- **错误处理：**后端将处理大文件、API超时等潜在问题，确保用户体验顺畅。







### **4.2 AI集成**





**中文:**



- **Azure语音API：**后端将集成Azure语音API，评估发音并返回评分。此功能将为用户提供实时的发音准确度反馈。





------





## **5. 部署与托管**





**中文:**



- **前端部署：**前端将托管在Vercel平台，通过与GitHub的集成实现快速部署和自动更新。
- **后端部署：**后端将使用Docker容器化，并部署到云服务中，以保证可扩展性和可靠性。





------





## **6. 测试与质量保证**







### **6.1 测试策略**





**中文:**



- **功能测试：**我们将测试所有核心功能，包括录音、评分和进度追踪，确保它们按预期工作。
- **端到端测试：**我们将进行全面的测试，确保所有组件无缝协作。







### **6.2 QA计划**





**中文:**



- **BUG报告：**在测试过程中发现的问题将通过任务管理工具进行报告和跟踪。
- **最终测试：**我们将在部署版本上进行最后一轮测试，确保它符合所有性能和稳定性要求。



