#!/usr/bin/env python
# -*- coding:utf-8 -*-
# 

import pymongo

#MongoDB基本配置
MONGO_IP   = '202.120.32.15'
MONGO_PORT = 27017

#数据库相关初始化
connection = pymongo.Connection(MONGO_IP, MONGO_PORT)
db_bbs = connection['bbs']


'''
    处理图片节点
'''
def dealImgTag():        
    count = 0
    for i in db_bbs['article_p'].find():
        count = count + 1
        tmp = i['content'].encode('utf-8');
        tmp = tmp.replace('<img src="http://bbs.sjtu.edu.cn/file','<img src="/file')
        print tmp
        print count
        db_bbs['article_p'].update({'_id':i['_id']},{'$set':{'content':tmp}})

if __name__ == "__main__":
    dealImgTag()











