#!/usr/bin/env python
# -*- coding:utf-8 -*-
# 

import pymongo
import re

#MongoDB基本配置
MONGO_IP   = '10.50.2.15'
MONGO_PORT = 27017

#数据库相关初始化
connection = pymongo.Connection(MONGO_IP, MONGO_PORT)
db_bbs = connection['bbs']



'''
    处理内容节点
'''
def dealArticle():        
    count = 0
    for i in db_bbs['article'].find():
        count = count + 1
        tmp = i['content'].encode('utf-8');
        if(tmp.find('<font')!=-1):
            tmp = re.sub(r'<font.*?>', '', tmp)
        if(tmp.find('</font>')!=-1):
            tmp = tmp.replace('</font>', '')
        print str(count)+'  '+str(i['_id'])
        db_bbs['article'].update({'_id':i['_id']},{'$set':{'body':tmp}})


if __name__ == "__main__":
    dealArticle()











